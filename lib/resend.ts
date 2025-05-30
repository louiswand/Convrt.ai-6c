import { Resend } from "resend"
import { WelcomeEmail } from "@/components/emails/welcome-email"
import type * as React from "react"

// Initialize Resend with API key
export const resend = new Resend(process.env.RESEND_API_KEY)

// Send welcome email to new users
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Convrt.ai <hello@convrt.ai>",
      to: email,
      subject: "Welcome to Convrt.ai - Let's Transform Your Outreach!",
      react: WelcomeEmail({ name }),
    })

    if (error) {
      console.error("Failed to send welcome email:", error)
      return { success: false, error }
    }

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
      react: OnboardingCompleteEmail({ name }),
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

// Simple onboarding complete email component
const OnboardingCompleteEmail: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <h1>Setup Complete!</h1>
      <p>Hi {name},</p>
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
      <p>
        <a href="https://your-app-url.vercel.app/dashboard">Go to Dashboard</a>
      </p>
      <p>
        Best regards,
        <br />
        The Convrt.ai Team
      </p>
    </div>
  )
}
