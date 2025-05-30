import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface OnboardingData {
  id: string
  user_id: string
  company: string | null
  role: string | null
  industry: string | null
  team_size: string | null
  icp_description: string | null
  keywords: string | null
  tone: string
  platforms: string[]
  is_completed: boolean
  created_at: string
  updated_at: string
}

export interface Opportunity {
  id: string
  platform: string
  author: string
  author_title: string | null
  content: string
  engagement_score: number | null
  relevance: string | null
  url: string | null
  likes: number
  comments: number
  created_at: string
  user_id: string | null
}
