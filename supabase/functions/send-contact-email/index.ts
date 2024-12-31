import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SendGridClient } from 'https://deno.land/x/sendgrid@0.0.3/mod.ts'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const TO_EMAIL = 'rehm.jam@gmail.com'
const FROM_EMAIL = 'no-reply@nordiclegacy.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    
    if (!record) {
      throw new Error('No record provided')
    }

    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured')
    }

    const sendgrid = new SendGridClient(SENDGRID_API_KEY)
    
    await sendgrid.send({
      to: TO_EMAIL,
      from: FROM_EMAIL,
      subject: 'New Contact Form Submission - Nordic Legacy',
      text: `
New Contact Form Submission:

Name: ${record.name}
Email: ${record.email}
Message: ${record.message}

Submitted at: ${new Date().toLocaleString()}
      `.trim()
    })

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})