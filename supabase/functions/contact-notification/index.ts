import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')
const FROM_EMAIL = 'jamil@aprikosventure.com'
const TO_EMAIL = 'rehm.jam@gmail.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record } = await req.json()
    console.log('Received contact form submission:', record)

    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured')
    }

    // Prepare email content
    const emailData = {
      personalizations: [{
        to: [{ email: TO_EMAIL }]
      }],
      from: { email: FROM_EMAIL },
      subject: `New Contact Form Submission from ${record.name}`,
      content: [{
        type: 'text/plain',
        value: `
Name: ${record.name}
Email: ${record.email}
Message: ${record.message}
        `
      }]
    }

    console.log('Sending email with SendGrid...')

    // Send email using SendGrid API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    console.log('SendGrid response status:', response.status)

    if (!response.ok) {
      const error = await response.text()
      console.error('SendGrid API error:', error)
      throw new Error(`SendGrid API error: ${error}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Error in contact-notification function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})