import { createClient as createSupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null

export const createClient = () => {
    // 서버사이드 렌더링 시에는 Supabase 클라이언트를 생성하지 않음
    if (typeof window === 'undefined') {
        return null
    }

    if (supabaseInstance) {
        return supabaseInstance
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Missing Supabase environment variables')
        return null
    }

    supabaseInstance = createSupabaseClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
}
