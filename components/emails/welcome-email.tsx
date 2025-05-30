import type * as React from "react"

interface WelcomeEmailProps {
  name: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#7c3aed",
            borderRadius: "12px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>C</span>
        </div>
        <h1 style={{ color: "#1f2937", margin: "0" }}>Welcome to Convrt.ai!</h1>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#374151" }}>Hi {name},</p>

      <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#374151" }}>
        Thank you for joining Convrt.ai! We&apos;re excited to help you transform your cold outreach into warm, trusted
        relationships that actually convert.
      </p>

      <div
        style={{
          backgroundColor: "#f3f4f6",
          padding: "20px",
          borderRadius: "8px",
          margin: "20px 0",
        }}
      >
        <h3 style={{ color: "#1f2937", marginTop: "0" }}>What&apos;s Next?</h3>
        <ol style={{ color: "#374151", paddingLeft: "20px" }}>
          <li style={{ marginBottom: "8px" }}>Complete your onboarding to set up your ideal customer profile</li>
          <li style={{ marginBottom: "8px" }}>Our AI will start finding high-intent conversations</li>
          <li style={{ marginBottom: "8px" }}>Review and approve AI-generated comments</li>
          <li>Watch your engagement rates soar! 📈</li>
        </ol>
      </div>

      <div style={{ textAlign: "center", margin: "30px 0" }}>
        <a
          href="https://your-app-url.vercel.app/onboarding"
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            padding: "14px 28px",
            textDecoration: "none",
            borderRadius: "8px",
            display: "inline-block",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Complete Your Setup →
        </a>
      </div>

      <div
        style={{
          borderTop: "1px solid #e5e7eb",
          paddingTop: "20px",
          marginTop: "30px",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        <p>
          Need help? Reply to this email or visit our{" "}
          <a href="#" style={{ color: "#7c3aed" }}>
            help center
          </a>
          .
        </p>
        <p style={{ margin: "10px 0 0 0" }}>
          Best regards,
          <br />
          The Convrt.ai Team
        </p>
      </div>
    </div>
  )
}
