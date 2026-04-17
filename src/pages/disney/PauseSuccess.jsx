import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'
import { useApp } from '../../context/AppContext'

const imgMickey = 'https://www.figma.com/api/mcp/asset/bce055ca-8952-4e1b-a5fd-98b9fc2b28df'

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PauseSuccess() {
  const navigate = useNavigate()
  const { user } = useApp()

  const pauseStart = user.upcomingCharge.date
  const pauseEnd = addDays(pauseStart, 14)

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#15181e', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 80px 80px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 506, display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Profile + Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, paddingTop: 32, paddingBottom: 20 }}>
            <div style={{ width: 78, height: 78, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <img src={imgMickey} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div style={{ width: '100%' }}>
              <div style={{ fontSize: 32, fontWeight: 700, lineHeight: '40px', color: '#f9f9f9', marginBottom: 20 }}>
                Your pause is scheduled, {user.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9fb' }}>
                We've sent a confirmation email to {user.email}. You can watch as usual until {pauseStart}.<br /><br />
                Your subscription for {user.huluPlan.name} will resume on {pauseEnd}
              </div>
            </div>
          </div>

          {/* Changed your mind card */}
          <div style={{ background: '#25272c', borderRadius: 4, padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, lineHeight: '32px', color: '#f9f9f9', marginBottom: 8 }}>
                Changed your mind or your plans?
              </div>
              <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#b7b8bd' }}>
                You can resume your subscription at any time
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={() => navigate('/subscription')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 48, background: '#f9f9f9', color: '#17171b', border: 'none', borderRadius: 4, fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer' }}
              >
                Resume Subscription
              </button>
              <button
                onClick={() => navigate('/')}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 48, background: 'transparent', color: '#f9f9f9', border: '2px solid #6f717b', borderRadius: 4, fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer' }}
              >
                Back to Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
