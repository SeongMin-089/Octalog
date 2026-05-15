import React from 'react'
import './Header.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { logout as logoutApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'
const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const menus = [
    {
      name: 'FIGHTER',
      link: '/app/posts/all'
    },
    {
      name: 'MY PROFILE',
      link: '/app/profile'
    },
    {
      name: 'MY PICKS',
      link: '/app/setting'
    }
  ]


  const handleLogout = async () => {
    try {

      await logoutApi()
      logout()
      navigate("/")

    } catch (error) {
      alert(error.message || '로그아웃 오류')
    }
  }
  return (
    <header className='header'>
      <div className="inner">
        <h1>
          <Link to="/app">
            <img src="/images/logo.svg" alt="logo" />
          </Link>
        </h1>
        <div className="right">

          <ul>
            {menus.map((menu, i) => (
              <li key={i}>
                <Button
                  icons
                  className="nav"
                  onClick={() => navigate(menu.link)}
                  text={menu.name} />
              </li>
            ))}
          </ul>
          <Button
            text="로그아웃"
            // backico='wh' 
            className="nav"
            onClick={handleLogout} />
        </div>
      </div>
    </header>
  )
}

export default Header