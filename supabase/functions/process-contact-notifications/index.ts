import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const TO_EMAIL = 'contact@nordiclegacy.com'
const FROM_EMAIL = 'no-reply@nordiclegacy.com'

serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get pending notifications
    const { data: notifications, error: fetchError } = await supabaseClient
      .from('contact_form_notifications')
      .select(`
        id,
        contact_form_id,
        contact_form (
          name,
          email,
          message
        )
      `)
      .eq('status', 'pending')
      .lt('attempts', 3)
      .order('created_at', { ascending: true })
      .limit(10)

    if (fetchError) throw fetchError

    for (const notification of notifications) {
      try {
        // Send email via SendGrid
        const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: TO_EMAIL }],
            }],
            from: { email: FROM_EMAIL },
            subject: 'New Contact Form Submission - Nordic Legacy',
            content: [{
              type: 'text/plain',
              value: `
New Contact Form Submission:

Name: ${notification.contact_form.name}
Email: ${notification.contact_form.email}
Message: ${notification.contact_form.message}

Submitted at: ${new Date().toLocaleString()}
              `.trim()
            }]
          })
        })

        if (!response.ok) {
          throw new Error('Failed to send email')
        }

        // Update notification status
        const { error: updateError } = await supabaseClient
          .from('contact_form_notifications')
          .update({ 
            status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('id', notification.id)

        if (updateError) throw updateError

      } catch (error) {
        console.error('Error processing notification:', error)

        // Update attempt count
        const { error: updateError } = await supabaseClient
          .from('contact_form_notifications')
          .update({ 
            attempts: notification.attempts + 1,
            last_attempt: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', notification.id)

        if (updateError) {
          console.error('Error updating notification:', updateError)
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in process-contact-notifications:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})