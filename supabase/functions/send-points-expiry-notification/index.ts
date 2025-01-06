import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')

interface RequestBody {
  email: string
  points: number
  expiryDate: string
}

serve(async (req) => {
  try {
    // Verify request method
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Parse request body
    const { email, points, expiryDate } = await req.json() as RequestBody

    // Format date for display
    const formattedDate = new Date(expiryDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Prepare email content
    const emailData = {
      personalizations: [{
        to: [{ email }]
      }],
      from: {
        email: 'no-reply@nordiclegacy.io',
        name: 'Nordic Legacy'
      },
      subject: 'Your Nordic Legacy Points Are Expiring Soon',
      content: [{
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1a1a1a;">Important Notice: Points Expiring Soon</h2>
            <p>Dear Nordic Legacy Member,</p>
            <p>We noticed that you have <strong>${points} points</strong> that will expire on ${formattedDate}.</p>
            <p>Don't let these points go to waste! Visit our benefits page to redeem your points for exclusive rewards and experiences.</p>
            <div style="margin: 30px 0;">
              <a href="https://nordiclegacy.io/dashboard/benefits" 
                 style="background-color: #4a5568; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Redeem Your Points Now
              </a>
            </div>
            <p>Thank you for being a valued member of Nordic Legacy.</p>
            <p style="color: #666; font-size: 14px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        `
      }]
    }

    // Send email using SendGrid
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.statusText}`)
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error sending notification:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}) 