"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase"
import { CheckCircle, XCircle, AlertCircle, Database, Users, Target, MessageSquare } from "lucide-react"

interface TableTest {
  name: string
  status: "loading" | "success" | "error"
  count?: number
  error?: string
  icon: any
}

export default function DatabaseTestPage() {
  const [tables, setTables] = useState<TableTest[]>([
    { name: "profiles", status: "loading", icon: Users },
    { name: "onboarding", status: "loading", icon: Database },
    { name: "opportunities", status: "loading", icon: Target },
    { name: "ai_comments", status: "loading", icon: MessageSquare },
  ])

  useEffect(() => {
    testAllTables()
  }, [])

  const testAllTables = async () => {
    const tableTests = [
      { name: "profiles", icon: Users },
      { name: "onboarding", icon: Database },
      { name: "opportunities", icon: Target },
      { name: "ai_comments", icon: MessageSquare },
    ]

    for (const table of tableTests) {
      try {
        const { data, error, count } = await supabase.from(table.name).select("*", { count: "exact", head: true })

        setTables((prev) =>
          prev.map((t) =>
            t.name === table.name
              ? {
                  ...t,
                  status: error ? "error" : "success",
                  count: count || 0,
                  error: error?.message,
                }
              : t,
          ),
        )
      } catch (err: any) {
        setTables((prev) =>
          prev.map((t) =>
            t.name === table.name
              ? {
                  ...t,
                  status: "error",
                  error: err.message,
                }
              : t,
          ),
        )
      }
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

  const getStatusBadge = (status: "loading" | "success" | "error", count?: number) => {
    switch (status) {
      case "loading":
        return <Badge variant="secondary">Testing...</Badge>
      case "success":
        return <Badge className="bg-green-500">{count} records</Badge>
      case "error":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  const allTablesWorking = tables.every((t) => t.status === "success")

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Database Schema Test</h1>
          <p className="text-muted-foreground">Testing all database tables and their accessibility</p>
        </div>

        {/* Overall Status */}
        <Card
          className={`border-2 ${allTablesWorking ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {allTablesWorking ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
              Database Status
            </CardTitle>
            <CardDescription>
              {allTablesWorking
                ? "All database tables are accessible and working correctly!"
                : "Testing database tables..."}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Individual Table Tests */}
        <div className="grid gap-4 md:grid-cols-2">
          {tables.map((table) => (
            <Card key={table.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <table.icon className="w-4 h-4" />
                  {table.name}
                </CardTitle>
                {getStatusIcon(table.status)}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {getStatusBadge(table.status, table.count)}
                  {table.error && <p className="text-xs text-red-600 font-mono bg-red-50 p-2 rounded">{table.error}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sample Data Display */}
        {allTablesWorking && (
          <Card>
            <CardHeader>
              <CardTitle>Sample Opportunities Data</CardTitle>
              <CardDescription>Here are the sample opportunities that were created</CardDescription>
            </CardHeader>
            <CardContent>
              <SampleOpportunities />
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center gap-4">
          <Button onClick={testAllTables}>Test Again</Button>
          {allTablesWorking && (
            <Button asChild>
              <a href="/auth/register">Try Registration Flow</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function SampleOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOpportunities = async () => {
      const { data, error } = await supabase.from("opportunities").select("*").limit(3)

      if (!error && data) {
        setOpportunities(data)
      }
      setLoading(false)
    }

    fetchOpportunities()
  }, [])

  if (loading) {
    return <div className="text-center">Loading sample data...</div>
  }

  return (
    <div className="space-y-3">
      {opportunities.map((opp) => (
        <div key={opp.id} className="border rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{opp.platform}</Badge>
            <span className="font-medium">{opp.author}</span>
            {opp.author_title && <span className="text-sm text-muted-foreground">• {opp.author_title}</span>}
          </div>
          <p className="text-sm mb-2">{opp.content}</p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>👍 {opp.likes}</span>
            <span>💬 {opp.comments}</span>
            <span>📊 {opp.engagement_score}% engagement</span>
          </div>
        </div>
      ))}
    </div>
  )
}
