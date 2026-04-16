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

export default function HuluLogin() {
  const navigate = useNavigate()
  const { isLoggedIn } = useApp()
  const [email, setEmail] = useState('alex@email.com')
  const [isActive, setIsActive] = useState(true)

  if (isLoggedIn) return <Navigate to="/hulu/account" replace />

  const handleFocus = () => setIsActive(true)
  const handleBlur = () => setIsActive(!!email)

  return (
    <div className="hulu-login-outer" style={{
      fontFamily: 'InspireTWDC, system-ui, sans-serif',
      flex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'linear-gradient(-17.6deg, rgb(24,57,73) 0.3%, rgb(4,4,5) 90.6%)',
      padding: '24px 40px', gap: 24
    }}>
      <style>{`
        .oneid-field-wrap {
          margin-top: 24px; background: #e9ebf0; border-radius: 4px;
          height: 60px; border-bottom: 2px solid #86898f;
          position: relative; cursor: text; box-sizing: border-box;
        }
        .oneid-label {
          position: absolute; left: 16px; right: 48px;
          top: 50%; transform: translateY(-50%);
          font-size: 16px; font-weight: 400; line-height: 24px; color: #5f6166;
          transition: top 0.15s ease, transform 0.15s ease, font-size 0.15s ease;
          pointer-events: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .oneid-label.active {
          top: 8px; transform: none; font-size: 12px; line-height: 20px;
        }
        .oneid-input {
          position: absolute; left: 16px; right: 48px; bottom: 10px;
          font-size: 16px; font-weight: 400; line-height: 24px; color: #252526;
          background: none; border: none; outline: none; font-family: inherit;
          width: calc(100% - 64px);
          opacity: 0; transition: opacity 0.1s;
        }
        .oneid-input.active { opacity: 1; }
        .oneid-input::placeholder { color: transparent; }
        .oneid-btn-login {
          display: block; width: 100%; background: black; color: white;
          border: none; border-radius: 28px; padding: 14px 24px;
          font-size: 16px; font-weight: 700; line-height: 24px;
          cursor: pointer; font-family: inherit; text-align: center; margin-top: 24px;
        }
        .oneid-btn-login:hover { opacity: 0.85; }
        @media (max-width: 600px) {
          .hulu-login-outer { padding: 20px 16px 32px !important; gap: 16px !important; }
          .hulu-login-logo-wrap { height: 56px !important; }
          .hulu-login-card-responsive { padding: 32px 24px !important; border-radius: 16px !important; }
        }
      `}</style>

      {/* Hulu wordmark */}
      <div className="hulu-login-logo-wrap" style={{ height: 80, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/logos/hulu-login-logo.svg" alt="hulu" style={{ height: 56, width: 168, display: 'block', flexShrink: 0 }} />
      </div>

      {/* Card */}
      <div style={{ background: 'white', borderRadius: 24, width: '100%', maxWidth: 580, padding: '56px 72px', boxSizing: 'border-box' }} className="hulu-login-card-responsive">

        {/* MyDisney logo */}
        <div style={{ height: 40, display: 'flex', alignItems: 'center', marginBottom: 0 }}>
          <img src="/logos/mydisney-login.svg" alt="MyDisney" style={{ height: 40, width: 96, display: 'block', flexShrink: 0 }} />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: '40px', color: '#252526', marginBottom: 8 }}>
          Enter your email to continue
        </h1>
        <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#252526' }}>
          Log in to Hulu with your MyDisney account. If you don't have one, you will be prompted to create one.
        </p>

        {/* Floating label email */}
        <div
          className="oneid-field-wrap"
          onClick={() => document.getElementById('hulu-email').focus()}
        >
          <label htmlFor="hulu-email" className={`oneid-label${isActive ? ' active' : ''}`}>Email</label>
          <input
            id="hulu-email"
            className={`oneid-input${isActive ? ' active' : ''}`}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="email"
          />
        </div>

        <button className="oneid-btn-login" onClick={() => navigate('/hulu/password')}>
          Continue
        </button>

        {/* Divider */}
        <div style={{ height: 1, background: '#e9ebf0', margin: '24px 0' }} />

        {/* Footer */}
        <div style={{ fontSize: 14, fontWeight: 700, lineHeight: '20px', color: '#5f6166', marginBottom: 8 }}>
          Hulu is part of The Walt Disney Family of Companies
        </div>
        <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#252526' }}>
          MyDisney lets you seamlessly log in to services and experiences across The Walt Disney Family of Companies, such as Disney+, ESPN, Walt Disney World, and <a href="#" style={{ color: '#0F5ABD', textDecoration: 'underline' }}>more</a>.
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
