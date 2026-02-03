import { useState, useEffect } from 'react'
import './TopBar.css'

function TopBar({ user, isGuest, onLogout }) {
  const [stardust, setStardust] = useState(200)

  useEffect(() => {
    if (isGuest) {
      // 게스트 데이터에서 우주먼지 가져오기
      const guestData = JSON.parse(localStorage.getItem('dokseomon_guest_data') || '{}')
      setStardust(guestData.stardust || 200)
    }
    // TODO: 회원인 경우 Supabase에서 가져오기
  }, [isGuest])

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span className="top-bar-title">독서몬</span>
        {isGuest && <span className="guest-badge">게스트</span>}
      </div>
      <div className="top-bar-right">
        <div className="stardust">
          ✨ <span>{stardust}</span>
        </div>
        <button className="logout-button" onClick={onLogout}>
          {isGuest ? '나가기' : '로그아웃'}
        </button>
      </div>
    </div>
  )
}

export default TopBar