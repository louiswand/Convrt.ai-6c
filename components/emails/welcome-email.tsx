import type React from "react"

interface WelcomeEmailProps {
  name: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }) => {
  return (
    <div>
      <h1>Welcome to Convrt.ai!</h1>
      <p>Hi {name},</p>
      <p>
        Thank you for joining Convrt.ai! We are excited to help you transform your cold outreach into warm, trusted
        relationships that actually convert.
      </p>
      <h3>What is Next?</h3>
      <ol>
        <li>Complete your onboarding to set up your ideal customer profile</li>
        <li>Our AI will start finding high-intent conversations</li>
        <li>Review and approve AI-generated comments</li>
        <li>Watch your engagement rates soar!</li>
      </ol>
      <p>
        <a href="https://your-app-url.vercel.app/onboarding">Complete Your Setup</a>
      </p>
      <p>Need help? Reply to this email or visit our help center.</p>
      <p>
        Best regards,
        <br />
        The Convrt.ai Team
      </p>
    </div>
  )
}
