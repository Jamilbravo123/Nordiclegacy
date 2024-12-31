import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const FROM_EMAIL = 'no-reply@nordiclegacy.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { referral, referrerName } = await req.json()
    
    if (!referral) {
      throw new Error('No referral data provided')
    }

    // Send email via SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: referral.email }],
        }],
        from: { email: FROM_EMAIL },
        subject: `${referrerName} invited you to join Nordic Legacy`,
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>You've been invited to join Nordic Legacy!</h2>
              
              ${referral.message ? `
                <p style="color: #666; font-style: italic;">
                  "${referral.message}"
                </p>
              ` : ''}
              
              <p>
                Your friend ${referrerName} thinks you'd be interested in joining 
                Nordic Legacy's exclusive membership program.
              </p>
              
              <p>
                As a member, you'll get access to:
                <ul>
                  <li>Exclusive benefits and rewards</li>
                  <li>Special member-only events</li>
                  <li>Points program with valuable rewards</li>
                </ul>
              </p>
              
              <a href="${Deno.env.get('SITE_URL')}/privilege" 
                 style="display: inline-block; background: #000; color: #fff; 
                        padding: 12px 24px; text-decoration: none; 
                        border-radius: 4px; margin-top: 20px;">
                Join Now
              </a>
            </div>
          `.trim()
        }]
      })
    })

    if (!response.ok) {
      throw new Error('Failed to send email via SendGrid')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in send-referral-invite:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})