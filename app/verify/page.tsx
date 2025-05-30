"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/components/auth-provider"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Database,
  Users,
  Target,
  MessageSquare,
  Key,
  Globe,
  Mail,
  Settings,
  Bot,
} from "lucide-react"

interface VerificationTest {
  name: string
  description: string
  status: "pending" | "running" | "success" | "error"
  error?: string
  icon: any
  details?: string
}

export default function VerifyPage() {
  const { user } = useAuth()
  const [tests, setTests] = useState<VerificationTest[]>([
    {
      name: "Environment Variables",
      description: "Check Supabase URL and API keys",
      status: "pending",
      icon: Key,
    },
    {
      name: "Database Connection",
      description: "Test connection to Supabase",
      status: "pending",
      icon: Database,
    },
    {
      name: "Authentication Service",
      description: "Verify auth functionality",
      status: "pending",
      icon: Globe,
    },
    {
      name: "Profiles Table",
      description: "Test user profiles table",
      status: "pending",
      icon: Users,
    },
    {
      name: "Onboarding Table",
      description: "Test onboarding data table",
      status: "pending",
      icon: Settings,
    },
    {
      name: "Opportunities Table",
      description: "Test opportunities data table",
      status: "pending",
      icon: Target,
    },
    {
      name: "AI Comments Table",
      description: "Test AI comments table",
      status: "pending",
      icon: MessageSquare,
    },
    {
      name: "Email Service",
      description: "Test Resend email integration",
      status: "pending",
      icon: Mail,
    },
    {
      name: "Sample Data",
      description: "Verify sample opportunities exist",
      status: "pending",
      icon: Bot,
    },
  ])

  const [overallProgress, setOverallProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const completedTests = tests.filter((t) => t.status === "success" || t.status === "error").length
    setOverallProgress((completedTests / tests.length) * 100)
  }, [tests])

  const updateTestStatus = (name: string, status: VerificationTest["status"], error?: string, details?: string) => {
    setTests((prev) => prev.map((test) => (test.name === name ? { ...test, status, error, details } : test)))
  }

  const runVerification = async () => {
    setIsRunning(true)

    // Reset all tests
    setTests((prev) => prev.map((test) => ({ ...test, status: "pending", error: undefined, details: undefined })))

    // Test 1: Environment Variables
    updateTestStatus("Environment Variables", "running")
    await new Promise((resolve) => setTimeout(resolve, 500))

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const resendKey = process.env.RESEND_API_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      updateTestStatus("Environment Variables", "error", "Missing Supabase environment variables")
    } else {
      updateTestStatus("Environment Variables", "success", undefined, `URL: ${supabaseUrl.substring(0, 30)}...`)
    }

    // Test 2: Database Connection
    updateTestStatus("Database Connection", "running")
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const { data, error } = await supabase.from("profiles").select("count").limit(1)
      if (error) throw error
      updateTestStatus("Database Connection", "success", undefined, "Connected successfully")
    } catch (error: any) {
      updateTestStatus("Database Connection", "error", error.message)
    }

    // Test 3: Authentication Service
    updateTestStatus("Authentication Service", "running")
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      updateTestStatus("Authentication Service", "success", undefined, user ? "User logged in" : "Service available")
    } catch (error: any) {
      updateTestStatus("Authentication Service", "error", error.message)
    }

    // Test 4-7: Database Tables
    const tables = [
      { name: "Profiles Table", table: "profiles" },
      { name: "Onboarding Table", table: "onboarding" },
      { name: "Opportunities Table", table: "opportunities" },
      { name: "AI Comments Table", table: "ai_comments" },
    ]

    for (const { name, table } of tables) {
      updateTestStatus(name, "running")
      await new Promise((resolve) => setTimeout(resolve, 300))

      try {
        const { data, error, count } = await supabase.from(table).select("*", { count: "exact", head: true })

        if (error) throw error
        updateTestStatus(name, "success", undefined, `${count || 0} records`)
      } catch (error: any) {
        updateTestStatus(name, "error", error.message)
      }
    }

    // Test 8: Email Service
    updateTestStatus("Email Service", "running")
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!resendKey) {
      updateTestStatus("Email Service", "error", "RESEND_API_KEY not found")
    } else {
      updateTestStatus("Email Service", "success", undefined, "API key configured")
    }

    // Test 9: Sample Data
    updateTestStatus("Sample Data", "running")
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      const { data, error } = await supabase.from("opportunities").select("*").limit(3)

      if (error) throw error
      if (data && data.length > 0) {
        updateTestStatus("Sample Data", "success", undefined, `${data.length} sample opportunities found`)
      } else {
        updateTestStatus("Sample Data", "error", "No sample data found")
      }
    } catch (error: any) {
      updateTestStatus("Sample Data", "error", error.message)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: VerificationTest["status"]) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      case "running":
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: VerificationTest["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "running":
        return <Badge variant="secondary">Running...</Badge>
      case "success":
        return <Badge className="bg-green-500">Passed</Badge>
      case "error":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length
  const allTestsComplete = tests.every((t) => t.status === "success" || t.status === "error")

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">System Verification</h1>
          <p className="text-muted-foreground">Comprehensive test of all Convrt.ai components</p>
        </div>

        {/* Overall Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Verification Progress</span>
              <span className="text-sm font-normal">
                {successCount}/{tests.length} tests passed
              </span>
            </CardTitle>
            <Progress value={overallProgress} className="w-full" />
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 text-sm">
              <span className="text-green-600">✓ {successCount} passed</span>
              <span className="text-red-600">✗ {errorCount} failed</span>
              <span className="text-gray-600">⏳ {tests.length - successCount - errorCount} pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid gap-4">
          {tests.map((test) => (
            <Card key={test.name} className={test.status === "error" ? "border-red-200" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <test.icon className="w-5 h-5" />
                  <div>
                    <CardTitle className="text-base">{test.name}</CardTitle>
                    <CardDescription className="text-sm">{test.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(test.status)}
                  {getStatusIcon(test.status)}
                </div>
              </CardHeader>
              {(test.details || test.error) && (
                <CardContent>
                  {test.details && <p className="text-sm text-muted-foreground">{test.details}</p>}
                  {test.error && (
                    <p className="text-sm text-red-600 font-mono bg-red-50 p-2 rounded mt-2">{test.error}</p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={runVerification} disabled={isRunning} size="lg">
            {isRunning ? "Running Verification..." : "Run Verification"}
          </Button>

          {allTestsComplete && successCount === tests.length && (
            <Button asChild variant="outline" size="lg">
              <a href="/auth/register">Start Using Convrt.ai</a>
            </Button>
          )}
        </div>

        {/* Next Steps */}
        {allTestsComplete && (
          <Card>
            <CardHeader>
              <CardTitle>{successCount === tests.length ? "🎉 All Systems Go!" : "⚠️ Issues Found"}</CardTitle>
              <CardDescription>
                {successCount === tests.length
                  ? "Your Convrt.ai platform is fully operational and ready to use."
                  : "Some components need attention before the platform is fully functional."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {successCount === tests.length ? (
                <div className="space-y-2">
                  <p className="text-sm">✅ Database schema created and accessible</p>
                  <p className="text-sm">✅ Authentication service working</p>
                  <p className="text-sm">✅ Email service configured</p>
                  <p className="text-sm">✅ Sample data loaded</p>
                  <p className="text-sm font-medium mt-4">Ready to:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Register new users</li>
                    <li>• Complete onboarding flow</li>
                    <li>• View AI-generated opportunities</li>
                    <li>• Test the full application</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm">Please fix the failed tests above before proceeding.</p>
                  <p className="text-sm">Common issues:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Missing environment variables in Vercel</li>
                    <li>• Incorrect Supabase URL or API key</li>
                    <li>• Database tables not created</li>
                    <li>• RLS policies blocking access</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
