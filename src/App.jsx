import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Navigation from './components/Navigation'
import TopBar from './components/TopBar'
import Login from './pages/Login'
import MyRoom from './pages/MyRoom'
import Library from './pages/Library'
import Cosmos from './pages/Cosmos'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isGuest, setIsGuest] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 현재 로그인 상태 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // 로그인 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 게스트 로그인
  const handleGuestLogin = () => {
    // 게스트 데이터 초기화 (로컬 스토리지)
    const guestData = {
      id: 'guest',
      nickname: '게스트',
      stardust: 200,
      tutorial_completed: false,
      eggs: [{ id: 1, name: '루비 알', category: '경영/경제' }],
      dokseomon: [],
      reading_logs: [],
    }
    localStorage.setItem('dokseomon_guest_data', JSON.stringify(guestData))
    setIsGuest(true)
  }

  // 로그아웃
  const handleLogout = async () => {
    if (isGuest) {
      // 게스트 데이터 삭제
      localStorage.removeItem('dokseomon_guest_data')
      setIsGuest(false)
    } else {
      await supabase.auth.signOut()
      setUser(null)
    }
  }

  // 로딩 중
  if (loading) {
    return (
      <div className="loading-screen">
        <p>📚 로딩 중...</p>
      </div>
    )
  }

  // 로그인 안 된 상태 (게스트도 아님)
  if (!user && !isGuest) {
    return (
      <Login 
        onLogin={setUser} 
        onGuestLogin={handleGuestLogin}
      />
    )
  }

  // 로그인 또는 게스트 상태
  return (
    <div className="app-container">
      <TopBar 
        user={user} 
        isGuest={isGuest}
        onLogout={handleLogout} 
      />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MyRoom isGuest={isGuest} />} />
          <Route path="/library" element={<Library isGuest={isGuest} />} />
          <Route path="/cosmos" element={<Cosmos isGuest={isGuest} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Navigation />
    </div>
  )
}

export default App