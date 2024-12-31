import { supabase } from '../supabase/client';
import type { ReferralFormData } from '../../types/referral';

export async function sendReferralInvites(data: ReferralFormData, userId: string) {
  const { emails, message } = data;
  
  const { error } = await supabase
    .from('referrals')
    .insert(emails.map(email => ({
      referrer_id: userId,
      email,
      message: message || null
    })));

  if (error) throw error;
}

export async function getReferralStats(userId: string) {
  const { data, error } = await supabase
    .from('referral_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function getReferralHistory(userId: string) {
  const { data, error } = await supabase
    .from('referrals')
    .select('*')
    .eq('referrer_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}