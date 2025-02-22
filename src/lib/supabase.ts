import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export const createClient = () => {
    // 서버사이드 렌더링 시에는 Supabase 클라이언트를 생성하지 않음
    if (typeof window === 'undefined') {
        return null
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Missing Supabase environment variables')
        return null
    }

    return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
