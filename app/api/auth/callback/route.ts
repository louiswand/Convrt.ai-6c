import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { sendWelcomeEmail } from "@/lib/resend"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/onboarding"

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data?.user) {
      // Send welcome email if this is a new user
      try {
        // Only attempt to send email if we have a valid email address
        if (data.user.email) {
          const fullName = data.user.user_metadata?.full_name || "there"
          await sendWelcomeEmail(data.user.email, fullName)
        }
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError)
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL(next, request.url))
}
