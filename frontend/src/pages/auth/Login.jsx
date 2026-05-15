import React, { useState } from "react"
import Button from "@/components/ui/Button"
import "./Auth.scss"
import Input from "@/components/ui/Input"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { login as loginApi } from "@/api/auth.api"
import { useAuth } from "@/store/auth.store"
const Login = () => {
  const navigate = useNavigate()

  const API_URL = import.meta.env.VITE_API_URL

  const { login, isReady, isAuthed } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSumit = async (e) => {
    e.preventDefault()
    if (!form.email.trim()) {
      setError("이메일을 입력해주세요")
      return
    }
    if (!form.password.trim()) {
      setError("비밀번호를 입력해주세요")
      return
    }

    try {
      setIsLoading(true)
      setError("")
      const data = await loginApi({
        email: form.email.trim(),
        password: form.password,
      })

      login(data)
      navigate("/app")
    } catch (error) {
      setError(error.message || "로그인을 실패했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/api/auth/kakao`
  }

  if (isReady && isAuthed) {
    return <Navigate to="/app" replace />
  }

  return (
    <section className="auth">
      <div className="inner">
        <div className="auth-box">
          <nav>
            <h2>로그인</h2>
            <Button
              text="뒤로가기"
              backico="wh"
              className="back"
              onClick={handleBack}
            />
          </nav>
          <form className="auth-form" onSubmit={handleSumit}>
            <div className="form-group">
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
              />
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="auth-btn-wrap">
              <Button text="로그인" type="submit" className="auth" />
            </div>
          </form>
          {error && <p className="error-text"> {error}</p>}
          <div className="auth-now">
            <span>계정이 없으신가요?</span>
            <Link to="/signup">
              <Button text="회원가입하기" icons />
            </Link>

            <Button
              text="카카오 로그인"
              className="kakao"
              type="button"
              onClick={handleKakaoLogin}
            >
              <svg width="28" height="29" viewBox="0 0 28 29" fill="none">
                <path
                  d="M14.0002 6.39999C8.70016 6.39999 4.41016 9.79999 4.41016 13.98C4.41016 16.71 6.23016 19.1 8.96016 20.43C8.76016 21.18 8.23016 23.14 8.13016 23.56C8.00016 24.08 8.32016 24.07 8.53016 23.94C8.70016 23.83 11.1602 22.15 12.2202 21.43C12.8002 21.52 13.3902 21.56 14.0002 21.56C19.3002 21.56 23.5902 18.16 23.5902 13.98C23.5902 9.79999 19.2902 6.39999 14.0002 6.39999Z"
                  fill="#ffffff"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
