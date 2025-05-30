"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  ThumbsUp,
  Eye,
  Bot,
  Linkedin,
  Twitter,
  ExternalLink,
  RefreshCw,
} from "lucide-react"

// Mock data for demonstration
const mockOpportunities = [
  {
    id: 1,
    platform: "LinkedIn",
    author: "Sarah Chen",
    title: "VP of Sales at TechCorp",
    content:
      "AI-driven lead generation is transforming how we approach B2B sales. The old spray-and-pray methods are becoming obsolete.",
    engagement: 92,
    relevance: "High",
    suggestedComment:
      "Absolutely agree, Sarah! We've seen similar transformations in our industry. The key is finding the right balance between automation and personalization. What specific AI tools have you found most effective for your team?",
    timeAgo: "2h ago",
    likes: 47,
    comments: 12,
  },
  {
    id: 2,
    platform: "Twitter",
    author: "Mike Rodriguez",
    title: "Founder @StartupX",
    content:
      "Cold emails are dead. Social selling is where the real connections happen. Building relationships > pushing products.",
    engagement: 87,
    relevance: "High",
    suggestedComment:
      "This resonates deeply, Mike. We've shifted our entire approach from cold outreach to relationship-first engagement. The conversion rates speak for themselves. Have you found certain platforms more effective than others for your industry?",
    timeAgo: "4h ago",
    likes: 156,
    comments: 23,
  },
  {
    id: 3,
    platform: "Reddit",
    author: "TechFounder23",
    title: "r/sales",
    content:
      "Looking for better ways to connect with prospects without being salesy. Traditional methods aren't working anymore.",
    engagement: 94,
    relevance: "Medium",
    suggestedComment:
      "I've been in your shoes! The shift from 'selling' to 'helping' was a game-changer for us. Focus on providing value first - share insights, ask thoughtful questions, and genuinely engage with their content. The sales conversations naturally follow.",
    timeAgo: "6h ago",
    likes: 89,
    comments: 34,
  },
]

const stats = [
  {
    title: "Today's Opportunities",
    value: "12",
    change: "+3 from yesterday",
    icon: Target,
    color: "text-blue-500",
  },
  {
    title: "Engagement Rate",
    value: "89%",
    change: "+5% this week",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Active Seeds",
    value: "47",
    change: "+8 this week",
    icon: Users,
    color: "text-purple-500",
  },
  {
    title: "Comments Made",
    value: "156",
    change: "+23 this week",
    icon: MessageSquare,
    color: "text-orange-500",
  },
]

export default function DashboardPage() {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "LinkedIn":
        return <Linkedin className="w-4 h-4" />
      case "Twitter":
        return <Twitter className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getRelevanceBadge = (relevance: string) => {
    const colors = {
      High: "bg-green-500/10 text-green-500 border-green-500/20",
      Medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Low: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    }
    return colors[relevance as keyof typeof colors] || colors.Low
  }

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-6 p-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Explorer Agent */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Explorer Agent
                  <Badge variant="secondary" className="text-xs">
                    AI Powered
                  </Badge>
                </CardTitle>
                <CardDescription>
                  👀 I found high-intent conversations where your ICP is discussing pain points. Want to join?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Opportunities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Today's Opportunities</h2>
            <Badge variant="outline">{mockOpportunities.length} found</Badge>
          </div>

          {mockOpportunities.map((opportunity) => (
            <Card key={opportunity.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getPlatformIcon(opportunity.platform)}
                      {opportunity.platform}
                    </Badge>
                    <div>
                      <p className="font-medium">{opportunity.author}</p>
                      <p className="text-sm text-muted-foreground">{opportunity.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getRelevanceBadge(opportunity.relevance)}>
                      {opportunity.relevance} Relevance
                    </Badge>
                    <span className="text-sm text-muted-foreground">{opportunity.timeAgo}</span>
                  </div>
                </div>

                {/* Original Post */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm">{opportunity.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {opportunity.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {opportunity.comments}
                    </span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Post
                    </Button>
                  </div>
                </div>

                {/* AI Suggested Comment */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">AI Suggested Comment</span>
                    <Progress value={opportunity.engagement} className="w-20 h-2" />
                    <span className="text-xs text-muted-foreground">{opportunity.engagement}% match</span>
                  </div>
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm">{opportunity.suggestedComment}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Approve & Post
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost">
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Manage your engagement strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Target className="w-6 h-6" />
              <span>Update ICP</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Eye\
