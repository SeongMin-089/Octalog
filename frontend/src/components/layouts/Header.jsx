import React, { useState } from 'react'
import './Header.scss'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import { logout as logoutApi } from '@/api/auth.api'
import { useAuth } from '@/store/auth.store'

const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handleMove = (link) => {
    navigate(link)
    setIsMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logoutApi()
      logout()
      navigate('/')
    } catch (error) {
      alert(error.message || '로그아웃 오류')
    }
  }

  return (
    <header className='header'>
      <div className='inner'>
        <h1>
          <Link to='/app'>
            <img src='/images/logo.svg' alt='logo' />
          </Link>
        </h1>

        <button
          type='button'
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label='메뉴 열기'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`right ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {menus.map((menu, i) => (
              <li key={i}>
                <Button
                  icons
                  className='nav'
                  onClick={() => handleMove(menu.link)}
                  text={menu.name}
                />
              </li>
            ))}
          </ul>

          <Button
            text='로그아웃'
            className='nav logout'
            onClick={handleLogout}
          />
        </div>
      </div>
    </header>
  )
}

export default Header