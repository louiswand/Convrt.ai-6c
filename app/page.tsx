import { LandingNavbar } from "@/components/landing-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Target, TrendingUp, Users, Zap, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Social Engagement
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Trust closes deals.
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-primary">We help you build it. Fast.</h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Sales isn't about pushing—it's about connecting. Convrt helps you engage with buyers where they already are,
            build real trust, and turn conversations into closed deals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#how-it-works">How It Works</Link>
            </Button>
          </div>

          {/* Dashboard Preview */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Explorer Agent</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      AI Powered
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  👀 I found high-intent conversations where your ICP is discussing pain points. Want to join?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      platform: "LinkedIn",
                      author: "Sarah Chen",
                      content: "AI-driven lead gen is the future of B2B prospecting.",
                      engagement: "92%",
                    },
                    {
                      platform: "Twitter",
                      author: "Mike Rodriguez",
                      content: "Cold emails are dead. Social selling is where it's at.",
                      engagement: "87%",
                    },
                    {
                      platform: "Reddit",
                      author: "TechFounder23",
                      content: "Looking for better ways to connect with prospects...",
                      engagement: "94%",
                    },
                  ].map((post, i) => (
                    <Card key={i} className="p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {post.platform}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <p className="text-xs mb-2">{post.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-green-500">Engagement: {post.engagement}</span>
                        <Button size="sm" variant="outline" className="text-xs">
                          Review
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Convrt.ai Works</h2>
            <p className="text-xl text-muted-foreground">
              Transform cold outreach into warm conversations in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "AI Identifies Opportunities",
                description:
                  "Our AI scans social platforms to find where your prospects are actively engaging with relevant topics and pain points.",
              },
              {
                icon: MessageSquare,
                title: "Smart Engagement",
                description:
                  "AI generates personalized, human-sounding comments that add value to conversations and warm up your prospects.",
              },
              {
                icon: TrendingUp,
                title: "Convert to Pipeline",
                description:
                  "Track engagement success and convert warmed leads into meaningful conversations and closed deals.",
              },
            ].map((step, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to build trust and close more deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                title: "AI Comment Generation",
                description: "Human-sounding comments tailored to each conversation",
              },
              {
                icon: Target,
                title: "ICP Matching",
                description: "Find prospects that match your ideal customer profile",
              },
              {
                icon: Users,
                title: "Multi-Platform Support",
                description: "Engage across LinkedIn, Twitter, and Reddit",
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description: "Track engagement success and conversion rates",
              },
              {
                icon: Zap,
                title: "Real-time Opportunities",
                description: "Get notified of high-intent conversations instantly",
              },
              {
                icon: MessageSquare,
                title: "CRM Integration",
                description: "Seamlessly manage leads and track relationships",
              },
            ].map((feature, i) => (
              <Card key={i} className="p-6">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Outreach?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join sales teams who've replaced cold emails with warm, trusted relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
