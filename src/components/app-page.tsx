'use client'

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Plus, Home, FileText, CreditCard, Settings, Play, LogOut, User as UserIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/lib/auth-context"
import { createClient } from '@/lib/supabase'

interface PlaceData {
  id: number
  name: string
  count: number
  keyword: string
  description: string
  placeUrl: string
}

const initialData: PlaceData[] = [
  {
    id: 1,
    name: "강한정PT 산본점",
    count: 0,
    keyword: "산본 PT",
    description: "[강한정PT스튜디오] 여성 트레이너만 있는 여성전용 PT",
    placeUrl: "https://m.place.naver.com/place/1470903890"
  },
  {
    id: 2,
    name: "개봉동 즐거운 피티샵",
    count: 0,
    keyword: "구로 필스장",
    description: "운동을 해야하는데 피곤하신분들도 즐겁게 운동할수있게",
    placeUrl: "https://m.place.naver.com/place/1268077662"
  },
  // Add more initial data as needed
]

export function BlockPage() {
  const [data, setData] = React.useState<PlaceData[]>(initialData)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const { user } = useAuth()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const handleCellEdit = (id: number, field: keyof PlaceData, value: string | number) => {
    setData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const handleAddRow = () => {
    const newId = Math.max(...data.map(item => item.id)) + 1
    setData([...data, { id: newId, name: "", count: 0, keyword: "", description: "", placeUrl: "" }])
  }

  const handleCreateReview = () => {
    // For now, just log the data. In the future, this would trigger the AI review generation.
    console.log("Creating review with data:", data)
    // Here you would typically call your AI service to generate the review
    alert("리뷰 생성 기능이 호출되었습니다. 콘솔을 확인해주세요.")
  }

  const handleInputFocus = () => {
    if (!user) {
      setShowAuthModal(true)
    }
  }

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <SidebarProvider>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <h2 className="px-6 text-lg font-semibold">리뷰공작소</h2>
          </SidebarHeader>
          <SidebarContent>
            <div className="px-6 py-4 border-b">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <UserIcon className="h-4 w-4" />
                    <span className="text-muted-foreground truncate">{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    로그아웃
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setShowAuthModal(true)}
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  로그인
                </Button>
              )}
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center">
                    <Home className="mr-2 h-4 w-4" />
                    홈
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    리뷰 생성
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    구독 관리
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    설정
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-hidden flex flex-col p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight">리뷰 생성</h1>
            <p className="text-muted-foreground mt-2">
              업체 정보를 입력하고 AI가 생성한 리뷰를 받아보세요.
            </p>
          </div>
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="relative w-96">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="업체명 또는 키워드 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
                onFocus={handleInputFocus}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={() => !user && setShowAuthModal(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" /> 새로운 업체 추가
              </Button>
              <Button onClick={() => !user && setShowAuthModal(true)} variant="default">
                <Play className="mr-2 h-4 w-4" /> 리뷰 생성
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px] sticky top-0 bg-background">업체명</TableHead>
                  <TableHead className="w-[120px] sticky top-0 bg-background">발행갯수</TableHead>
                  <TableHead className="w-[200px] sticky top-0 bg-background">키워드</TableHead>
                  <TableHead className="w-[350px] sticky top-0 bg-background">소개</TableHead>
                  <TableHead className="sticky top-0 bg-background">플레이스 주소</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <Input
                        value={item.name}
                        onChange={(e) => handleCellEdit(item.id, 'name', e.target.value)}
                        className="w-full"
                        onFocus={handleInputFocus}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.count}
                        onChange={(e) => handleCellEdit(item.id, 'count', parseInt(e.target.value, 10))}
                        className="w-full"
                        onFocus={handleInputFocus}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.keyword}
                        onChange={(e) => handleCellEdit(item.id, 'keyword', e.target.value)}
                        className="w-full"
                        onFocus={handleInputFocus}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => handleCellEdit(item.id, 'description', e.target.value)}
                        className="w-full"
                        onFocus={handleInputFocus}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.placeUrl}
                        onChange={(e) => handleCellEdit(item.id, 'placeUrl', e.target.value)}
                        className="w-full"
                        onFocus={handleInputFocus}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}