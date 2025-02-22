'use client'

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { Provider } from '@supabase/supabase-js'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type CustomProvider = Provider | 'naver' | 'kakao'

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const supabase = createClient()

  const handleSocialLogin = async (provider: CustomProvider) => {
    try {
      const { error: _error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (_error) {
        toast.error('소셜 로그인 중 오류가 발생했습니다.')
      }
    } catch (_error) {
      toast.error('소셜 로그인 중 오류가 발생했습니다.')
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error: _error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (_error) {
        if (_error.message === 'Email not confirmed') {
          toast.error('이메일 인증을 완료해주세요.')
        } else if (_error.message === 'Invalid login credentials') {
          toast.error('이메일 또는 비밀번호가 올바르지 않습니다.')
        } else {
          toast.error(_error.message)
        }
      } else {
        toast.success('로그인 성공!')
        onClose()
      }
    } catch (_error) {
      toast.error('로그인 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.')
      setIsLoading(false)
      return
    }

    try {
      const { error: _error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })

      if (_error) {
        if (_error.message === 'User already registered') {
          toast.error('이미 가입된 이메일입니다.')
        } else {
          toast.error(_error.message)
        }
      } else {
        toast.success(
          '회원가입이 완료되었습니다. 메일함을 확인해주세요!',
          {
            description: '발송된 이메일의 인증 링크를 클릭하여 이메일 인증을 완료해주세요.',
            duration: 5000,
          }
        )
        onClose()
      }
    } catch (_error) {
      toast.error('회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>시작하기</DialogTitle>
          <DialogDescription>
            리뷰공작소의 모든 기능을 이용하시려면 로그인이 필요합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            className="w-full"
          >
            <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google로 계속하기
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSocialLogin('naver')}
            className="w-full bg-[#03C75A] text-white hover:bg-[#03C75A]/90"
          >
            <svg viewBox="0 0 20 20" className="mr-2 h-4 w-4 fill-current">
              <path d="M13.441 10.72l-4.347 6.315h-4.308l4.347-6.315-4.347-6.315h4.308l4.347 6.315z" />
            </svg>
            네이버로 계속하기
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSocialLogin('kakao')}
            className="w-full bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90"
          >
            <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="currentColor">
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.138.092-.3.114-.452.063a.5.5 0 01-.296-.413l-.001-.129V18.5c-2.608-1.425-4.116-3.724-4.116-6.315C1.5 6.664 6.201 3 12 3z" />
            </svg>
            카카오로 계속하기
          </Button>
        </div>

        <Separator className="my-4" />

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">로그인</TabsTrigger>
            <TabsTrigger value="signup">회원가입</TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "로그인 중..." : "로그인"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">이메일</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">비밀번호</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password-confirm">비밀번호 확인</Label>
                <Input
                  id="signup-password-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "가입 중..." : "회원가입"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 