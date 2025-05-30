import { Resend } from "resend"

// Initialize Resend with API key
export const resend = new Resend(process.env.RESEND_API_KEY)

// Send welcome email to new users
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    console.log("Attempting to send welcome email to:", email)
    console.log("Resend API Key present:", !!process.env.RESEND_API_KEY)
    
    const { data, error } = await resend.emails.send({
      from: "Convrt.ai <hello@convrt.ai>",
      to: email,
      subject: "Welcome to Convrt.ai - Let's Transform Your Outreach!",
      html: getWelcomeEmailHtml(name),
    })

    if (error) {
      console.error("Failed to send welcome email:", error)
      return { success: false, error }
    }

    console.log("Welcome email sent successfully:", data)
    return { success: true, data }
  } catch (error) {
    console.error("Error sending welcome email:", error)
    return { success: false, error }
  }
}

// Send onboarding completion email
export const sendOnboardingCompleteEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Convrt.ai <hello@convrt.ai>",
      to: email,
      subject: "Your Convrt.ai Setup is Complete!",
      html: getOnboardingCompleteEmailHtml(name),
    })

    if (error) {
      console.error("Failed to send onboarding complete email:", error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error sending onboarding complete email:", error)
    return { success: false, error }
  }
}

// HTML template for welcome email
function getWelcomeEmailHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Welcome to Convrt.ai</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 60px; height: 60px; background-color: #7c3aed; border-radius: 12px; display: inline-block; text-align: center; line-height: 60px; margin-bottom: 20px;">
          <span style="color: white; font-size: 24px; font-weight: bold;">C</span>
        </div>
        <h1 style="color: #1f2937; margin: 0;">Welcome to Convrt.ai!</h1>
      </div>

      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi ${name},</p>

      <p style="font-size: 16px; line-height: 1.6; color: #374151;">
        Thank you for joining Convrt.ai! We are excited to help you transform your cold outreach into warm, trusted
        relationships that actually convert.
      </p>

      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-top: 0;">What is Next?</h3>
        <ol style="color: #374151; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Complete your onboarding to set up your ideal customer profile</li>
          <li style="margin-bottom: 8px;">Our AI will start finding high-intent conversations</li>
          <li style="margin-bottom: 8px;">Review and approve AI-generated comments</li>
          <li>Watch your engagement rates soar!</li>
        </ol>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://your-app-url.vercel.app/onboarding" 
           style="background-color: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 16px; font-weight: 600;">
          Complete Your Setup
        </a>
      </div>

      <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #6b7280;">
        <p>
          Need help? Reply to this email or visit our 
          <a href="#" style="color: #7c3aed;">help center</a>.
        </p>
        <p style="margin: 10px 0 0 0;">
          Best regards,<br>
          The Convrt.ai Team
        </p>
      </div>
    </body>
    </html>
  `
}

// HTML template for onboarding complete email
function getOnboardingCompleteEmailHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your Convrt.ai Setup is Complete!</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #7c3aed;">Setup Complete! 🚀</h1>
      <p>Hi ${name},</p>
      <p>
        Congratulations! Your Convrt.ai account is now fully set up and ready to help you transform your outreach
        strategy.
      </p>
      <p>Here is what happens next:</p>
      <ul>
        <li>Our AI will start scanning social platforms for opportunities</li>
        <li>You will receive notifications when high-intent conversations are found</li>
        <li>Review and approve AI-generated comments before posting</li>
      </ul>
      <p>Ready to start building trust and closing more deals?</p>
      <a href="https://your-app-url.vercel.app/dashboard" 
         style="background-color: #7c3aed; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Go to Dashboard
      </a>
      <p>
        Best regards,<br>
        The Convrt.ai Team
      </p>
    </body>
    </html>
  `
}
