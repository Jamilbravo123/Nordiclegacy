-- Create a table to track notification status
create table if not exists points_notifications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  points_amount int not null,
  expiry_date timestamp with time zone not null,
  notification_sent boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create a function to check for expiring points and send notifications
create or replace function notify_expiring_points()
returns void
language plpgsql
security definer
as $$
declare
  notification record;
begin
  -- Find users with expiring points who haven't been notified
  for notification in
    select 
      p.id as profile_id,
      p.email,
      sum(ph.points) as expiring_points,
      (now() + interval '30 days')::date as expiry_date
    from auth.users u
    join member_profiles p on u.id = p.id
    join points_history ph on u.id = ph.user_id
    where 
      ph.created_at <= (now() - interval '11 months')
      and not exists (
        select 1 
        from points_notifications pn 
        where pn.user_id = u.id 
        and pn.expiry_date::date = (now() + interval '30 days')::date
      )
    group by p.id, p.email
  loop
    -- Insert notification record
    insert into points_notifications (
      user_id,
      points_amount,
      expiry_date
    ) values (
      notification.profile_id,
      notification.expiring_points,
      notification.expiry_date
    );

    -- Send email using Supabase Edge Function
    perform net.http_post(
      url := 'https://omabipwegntmsurwohix.supabase.co/functions/v1/send-points-expiry-notification',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('request.header.apikey')
      ),
      body := jsonb_build_object(
        'email', notification.email,
        'points', notification.expiring_points,
        'expiryDate', notification.expiry_date
      )
    );
  end loop;
end;
$$; 