"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, AlertCircle, Database, Key, Globe } from "lucide-react"

export default function TestConnectionPage() {
  const [connectionStatus, setConnectionStatus] = useState<{
    database: "loading" | "success" | "error"
    auth: "loading" | "success" | "error"
    envVars: "loading" | "success" | "error"
    details: {
      supabaseUrl?: string
      hasAnonKey?: boolean
      error?: string
    }
  }>({
    database: "loading",
    auth: "loading",
    envVars: "loading",
    details: {},
  })

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setConnectionStatus({
      database: "loading",
      auth: "loading",
      envVars: "loading",
      details: {},
    })

    // Test environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const envStatus = supabaseUrl && supabaseAnonKey ? "success" : "error"

    setConnectionStatus((prev) => ({
      ...prev,
      envVars: envStatus,
      details: {
        supabaseUrl: supabaseUrl || "Missing",
        hasAnonKey: !!supabaseAnonKey,
      },
    }))

    if (envStatus === "error") {
      setConnectionStatus((prev) => ({
        ...prev,
        database: "error",
        auth: "error",
        details: {
          ...prev.details,
          error: "Missing environment variables",
        },
      }))
      return
    }

    try {
      // Test database connection
      const { data, error: dbError } = await supabase.from("profiles").select("count").limit(1)

      // Also test the onboarding table
      const { data: onboardingData, error: onboardingError } = await supabase
        .from("onboarding")
        .select("count")
        .limit(1)

      // Test opportunities table
      const { data: opportunitiesData, error: opportunitiesError } = await supabase
        .from("opportunities")
        .select("count")
        .limit(1)

      setConnectionStatus((prev) => ({
        ...prev,
        database: dbError || onboardingError || opportunitiesError ? "error" : "success",
        details: {
          ...prev.details,
          error: dbError?.message || onboardingError?.message || opportunitiesError?.message,
        },
      }))

      // Test auth connection
      const { data: authData, error: authError } = await supabase.auth.getSession()

      setConnectionStatus((prev) => ({
        ...prev,
        auth: authError ? "error" : "success",
      }))
    } catch (error: any) {
      setConnectionStatus((prev) => ({
        ...prev,
        database: "error",
        auth: "error",
        details: {
          ...prev.details,
          error: error.message,
        },
      }))
    }
  }

  const getStatusIcon = (status: "loading" | "success" | "error") => {
    switch (status) {
      case "loading":
        return <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: "loading" | "success" | "error") => {
    switch (status) {
      case "loading":
        return <Badge variant="secondary">Testing...</Badge>
      case "success":
        return <Badge className="bg-green-500">Connected</Badge>
      case "error":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Supabase Connection Test</h1>
          <p className="text-muted-foreground">Testing your Supabase connection and configuration</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Environment Variables */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Key className="w-4 h-4" />
                Environment Variables
              </CardTitle>
              {getStatusIcon(connectionStatus.envVars)}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge(connectionStatus.envVars)}
                <div className="text-xs text-muted-foreground">
                  <p>URL: {connectionStatus.details.supabaseUrl}</p>
                  <p>Anon Key: {connectionStatus.details.hasAnonKey ? "Present" : "Missing"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Connection */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="w-4 h-4" />
                Database
              </CardTitle>
              {getStatusIcon(connectionStatus.database)}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge(connectionStatus.database)}
                <p className="text-xs text-muted-foreground">Testing profiles table access</p>
              </div>
            </CardContent>
          </Card>

          {/* Auth Connection */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Authentication
              </CardTitle>
              {getStatusIcon(connectionStatus.auth)}
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getStatusBadge(connectionStatus.auth)}
                <p className="text-xs text-muted-foreground">Testing auth service</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Details */}
        {connectionStatus.details.error && (
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Connection Error
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-600 font-mono bg-red-50 p-3 rounded">{connectionStatus.details.error}</p>
            </CardContent>
          </Card>
        )}

        {/* Setup Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
            <CardDescription>Follow these steps to connect your Supabase instance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">1. Get your Supabase credentials</h4>
              <p className="text-sm text-muted-foreground">Go to your Supabase project dashboard → Settings → API</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">2. Add environment variables</h4>
              <p className="text-sm text-muted-foreground">Add these to your Vercel project environment variables:</p>
              <div className="bg-muted p-3 rounded font-mono text-sm">
                <p>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</p>
                <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">3. Run the database setup</h4>
              <p className="text-sm text-muted-foreground">
                Execute the SQL commands from earlier to create the necessary tables
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={testConnection}>Test Connection Again</Button>
        </div>
      </div>
    </div>
  )
}
