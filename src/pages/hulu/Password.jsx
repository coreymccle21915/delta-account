import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

const logoParade = [
  { src: '/logos/1-disney.svg', alt: 'Disney+' },
  { src: '/logos/2-abc.svg', alt: 'ABC' },
  { src: '/logos/3-espn.svg', alt: 'ESPN' },
  { src: '/logos/4-marvel.svg', alt: 'Marvel' },
  { src: '/logos/5-starwars.svg', alt: 'Star Wars' },
  { src: '/logos/6-hulu.svg', alt: 'Hulu' },
  { src: '/logos/7-natgeo.svg', alt: 'Nat Geo' },
]

const EyeIcon = ({ visible }) => visible ? (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#5f6166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="#5f6166" strokeWidth="1.5"/>
  </svg>
) : (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#5f6166" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="1" y1="1" x2="23" y2="23" stroke="#5f6166" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

export default function HuluPassword() {
  const navigate = useNavigate()
  const { isLoggedIn, login } = useApp()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [error, setError] = useState('')
  const [borderColor, setBorderColor] = useState('#86898f')

  if (isLoggedIn) return <Navigate to="/hulu/account" replace />

  const handleFocus = () => setIsActive(true)
  const handleBlur = () => setIsActive(!!password)

  function handleLogin() {
    if (!password.trim()) {
      setError('Please enter your password.')
      setBorderColor('#d32f2f')
    } else {
      setError('')
      setBorderColor('#86898f')
      login()
      navigate('/hulu/account')
    }
  }

  return (
    <div style={{
      fontFamily: 'InspireTWDC, system-ui, sans-serif',
      minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'linear-gradient(-17.6deg, rgb(24,57,73) 0.3%, rgb(4,4,5) 90.6%)',
    }}>
      <style>{`
        .oneid-field-wrap2 {
          margin-top: 24px; background: #e9ebf0; border-radius: 4px;
          height: 60px; position: relative; cursor: text; box-sizing: border-box;
        }
        .oneid-label2 {
          position: absolute; left: 16px; right: 48px;
          top: 50%; transform: translateY(-50%);
          font-size: 16px; font-weight: 400; line-height: 24px; color: #5f6166;
          transition: top 0.15s ease, transform 0.15s ease, font-size 0.15s ease;
          pointer-events: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .oneid-label2.active {
          top: 8px; transform: none; font-size: 12px; line-height: 20px;
        }
        .oneid-input2 {
          position: absolute; left: 16px; right: 48px; bottom: 10px;
          font-size: 16px; font-weight: 400; line-height: 24px; color: #252526;
          background: none; border: none; outline: none; font-family: inherit;
          width: calc(100% - 64px);
          opacity: 0; transition: opacity 0.1s;
        }
        .oneid-input2.active { opacity: 1; }
        .oneid-input2::placeholder { color: transparent; }
        .oneid-btn-login2 {
          display: block; width: 100%; background: black; color: white;
          border: none; border-radius: 28px; padding: 14px 24px;
          font-size: 16px; font-weight: 700; line-height: 24px;
          cursor: pointer; font-family: inherit; text-align: center; margin-top: 24px;
        }
        .oneid-btn-login2:hover { opacity: 0.85; }

        /* Desktop: floating card centered */
        .hulu-pw-logo-wrap {
          height: 80px; display: flex; align-items: flex-end;
          justify-content: center; overflow: hidden; padding: 0 40px;
          margin-top: 24px;
        }
        .hulu-pw-card-responsive {
          background: white; border-radius: 24px;
          width: 100%; max-width: 580px;
          padding: 56px 72px; box-sizing: border-box;
          margin: 24px 40px 40px;
        }

        /* Mobile: full-width bottom-sheet card */
        @media (max-width: 600px) {
          .hulu-pw-logo-wrap {
            height: 64px; padding: 0; margin-top: 24px; width: 100%;
            align-items: center;
          }
          .hulu-pw-card-responsive {
            border-radius: 24px 24px 0 0;
            max-width: 100%; margin: 24px 0 0;
            padding: 32px 24px 80px;
            flex: 1;
          }
        }
      `}</style>

      {/* Hulu wordmark */}
      <div className="hulu-pw-logo-wrap">
        <img src="/logos/hulu-login-logo.svg" alt="hulu" style={{ height: 44, width: 'auto', display: 'block', flexShrink: 0 }} />
      </div>

      {/* Card */}
      <div className="hulu-pw-card-responsive">

        {/* MyDisney logo */}
        <div style={{ height: 40, display: 'flex', alignItems: 'center', marginBottom: 0 }}>
          <img src="/logos/mydisney-login.svg" alt="MyDisney" style={{ height: 40, width: 96, display: 'block', flexShrink: 0 }} />
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 700, lineHeight: '36px', color: '#252526', margin: '8px 0' }}>
          Good news, you already have a MyDisney account
        </h1>
        <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '24px', color: '#252526' }}>
          Since you've already used your email to sign up for one or more services across The Walt Disney Family of Companies, you can now log in to Hulu with MyDisney using <strong>alex@email.com</strong><br /><br />
          Enter your current password to log in.
        </p>

        {/* Floating label password */}
        <div
          className="oneid-field-wrap2"
          style={{ borderBottom: `2px solid ${borderColor}` }}
          onClick={() => document.getElementById('hulu-pw').focus()}
        >
          <label htmlFor="hulu-pw" className={`oneid-label2${isActive ? ' active' : ''}`}>Password</label>
          <input
            id="hulu-pw"
            className={`oneid-input2${isActive ? ' active' : ''}`}
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={e => { e.stopPropagation(); setShowPassword(s => !s) }}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <EyeIcon visible={showPassword} />
          </button>
        </div>
        {error && <div style={{ fontSize: 12, color: '#d32f2f', marginTop: 6 }}>{error}</div>}

        <button className="oneid-btn-login2" onClick={handleLogin}>
          Log In
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: '#e9ebf0', margin: '24px 0' }} />

        {/* Footer */}
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#5f6166', marginBottom: 8 }}>
          Hulu is part of The Walt Disney Family of Companies
        </div>
        <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#252526' }}>
          MyDisney lets you seamlessly log in to services and experiences across The Walt Disney Family of Companies, such as Disney+, ESPN, Walt Disney World, and <a href="#" style={{ color: '#0040e5', textDecoration: 'underline' }}>more</a>.
        </p>

        {/* Logo parade */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginTop: 20, alignItems: 'flex-start' }}>
          {logoParade.map(logo => (
            <img key={logo.alt} src={logo.src} alt={logo.alt} style={{ height: 32, maxHeight: 32, width: 'auto', display: 'block', flexShrink: 0, objectFit: 'contain' }} />
          ))}
        </div>
      </div>
    </div>
  )
}
