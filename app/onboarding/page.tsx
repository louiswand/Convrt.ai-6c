"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabase"
import { sendOnboardingCompleteEmail } from "@/lib/resend"
import { ArrowRight, CheckCircle, Linkedin, Twitter, MessageSquare } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    industry: "",
    teamSize: "",
    icpDescription: "",
    keywords: "",
    tone: "professional",
    platforms: [] as string[],
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = async () => {
    if (!user || !profile) return

    setIsLoading(true)
    try {
      // Save onboarding data to Supabase
      const { error } = await supabase.from("onboarding").insert({
        id: crypto.randomUUID(),
        user_id: user.id,
        company: formData.company,
        role: formData.role,
        industry: formData.industry,
        team_size: formData.teamSize,
        icp_description: formData.icpDescription,
        keywords: formData.keywords,
        tone: formData.tone,
        platforms: formData.platforms,
        is_completed: true,
      })

      if (error) throw error

      // Send onboarding completion email
      try {
        await sendOnboardingCompleteEmail(profile.email, profile.full_name || "there")
      } catch (emailError) {
        console.error("Failed to send onboarding complete email:", emailError)
        // Don't fail the onboarding if email fails
      }

      toast({
        title: "Setup complete! 🎉",
        description: "Welcome to Convrt.ai. Let's start finding opportunities.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving onboarding:", error)
      toast({
        title: "Setup failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i}
                </div>
                {i < 4 && <div className={`w-12 h-0.5 ${i < step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <CardTitle className="text-2xl">
            {step === 1 && "Tell us about yourself"}
            {step === 2 && "Define your ideal customer"}
            {step === 3 && "Set your engagement style"}
            {step === 4 && "Connect your platforms"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Help us understand your business context"}
            {step === 2 && "Who are you trying to reach?"}
            {step === 3 && "How should AI engage on your behalf?"}
            {step === 4 && "Choose where to find opportunities"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g. Sales Manager"
                    value={formData.role}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, industry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, teamSize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="200+">200+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="icpDescription">Ideal Customer Profile</Label>
                <Textarea
                  id="icpDescription"
                  placeholder="Describe your ideal customer (e.g., CTOs at Series A startups, Marketing Directors at mid-market SaaS companies)"
                  value={formData.icpDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icpDescription: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords & Topics</Label>
                <Textarea
                  id="keywords"
                  placeholder="Enter keywords, hashtags, or topics your prospects discuss (e.g., #sales, lead generation, CRM, automation)"
                  value={formData.keywords}
                  onChange={(e) => setFormData((prev) => ({ ...prev, keywords: e.target.value }))}
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>AI Engagement Tone</Label>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { value: "professional", label: "Professional", description: "Formal, business-focused responses" },
                    { value: "friendly", label: "Friendly", description: "Warm, approachable tone" },
                    { value: "expert", label: "Expert", description: "Authoritative, thought-leadership style" },
                    { value: "challenger", label: "Challenger", description: "Provocative, question-asking approach" },
                  ].map((tone) => (
                    <Card
                      key={tone.value}
                      className={`p-4 cursor-pointer transition-colors ${
                        formData.tone === tone.value ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, tone: tone.value }))}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{tone.label}</h3>
                          <p className="text-sm text-muted-foreground">{tone.description}</p>
                        </div>
                        {formData.tone === tone.value && <CheckCircle className="w-5 h-5 text-primary" />}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Social Platforms</Label>
                <p className="text-sm text-muted-foreground">
                  Select platforms where you want to find engagement opportunities
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      value: "linkedin",
                      label: "LinkedIn",
                      icon: Linkedin,
                      description: "Professional networking and B2B discussions",
                    },
                    {
                      value: "twitter",
                      label: "Twitter/X",
                      icon: Twitter,
                      description: "Real-time conversations and trending topics",
                    },
                    {
                      value: "reddit",
                      label: "Reddit",
                      icon: MessageSquare,
                      description: "Community discussions and niche topics",
                    },
                  ].map((platform) => (
                    <Card
                      key={platform.value}
                      className={`p-4 cursor-pointer transition-colors ${
                        formData.platforms.includes(platform.value)
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                      onClick={() => togglePlatform(platform.value)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <platform.icon className="w-5 h-5" />
                          <div>
                            <h3 className="font-medium">{platform.label}</h3>
                            <p className="text-sm text-muted-foreground">{platform.description}</p>
                          </div>
                        </div>
                        {formData.platforms.includes(platform.value) && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={isLoading}>
              {isLoading ? "Setting up..." : step === 4 ? "Complete Setup" : "Next"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
