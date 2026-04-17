import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'
import { useApp } from '../../context/AppContext'

const DURATIONS = ['2 Weeks', '1 Month', '2 Months', '3 Months']
const DURATION_DAYS = { '2 Weeks': 14, '1 Month': 30, '2 Months': 60, '3 Months': 90 }

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function PauseSchedule() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [duration, setDuration] = useState('2 Weeks')
  const [open, setOpen] = useState(false)

  const pauseStart = user.upcomingCharge.date
  const pauseEnd = addDays(pauseStart, DURATION_DAYS[duration])

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 80px 0' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 506 }}>

          {/* Breadcrumb */}
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, marginBottom: 24, background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer', marginLeft: -12 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Back</span>
          </button>

          {/* Headline */}
          <div style={{ paddingBottom: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 600, lineHeight: '40px', color: '#f9f9f9', marginBottom: 16 }}>
              Need a break? Schedule a Pause
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#b7b8bd' }}>
              If you'd like to put your subscription on temporary pause, it's easy to do. You can also resume it anytime. Please note that the pause won't take effect until the end of your current billing cycle which is {pauseStart}.
            </div>
          </div>

          {/* Duration Select */}
          <div style={{ position: 'relative', marginBottom: 4 }}>
            <button
              onClick={() => setOpen(o => !o)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: '#1e1f24', border: '1.5px solid #6f717b', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', color: '#f9f9f9', fontSize: 16, fontWeight: 400, lineHeight: '24px' }}
            >
              <span>{duration}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                <path d="M6 9L12 15L18 9" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open && (
              <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#1e1f24', border: '1.5px solid #6f717b', borderRadius: 8, overflow: 'hidden', zIndex: 10 }}>
                {DURATIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => { setDuration(d); setOpen(false) }}
                    style={{ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', background: d === duration ? '#2d2f36' : 'transparent', color: '#f9f9f9', fontSize: 16, fontWeight: 400, lineHeight: '24px', border: 'none', cursor: 'pointer' }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Resume language */}
          <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#b7b8bd', padding: '16px 0 32px' }}>
            Your subscription for {user.huluPlan.name} will resume on {pauseEnd}. We will send an email before your subscription is set to resume.
          </div>

          {/* Pause button */}
          <button
            onClick={() => navigate('/pause/success')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 48, background: 'transparent', color: '#f9f9f9', border: '2px solid #6f717b', borderRadius: 8, fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', marginBottom: 16 }}
          >
            Pause Subscription
          </button>

          {/* Legal */}
          <div style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#b7b8bd', paddingTop: 0, paddingBottom: 40 }}>
            Legal talk about how your plan will begin pause from <strong>{pauseStart}</strong> and resume <strong>{pauseEnd}</strong>. Any and all other things that help us not get in trouble will follow in this area.
          </div>

        </div>
      </div>

      {/* Button Dock */}
      <div style={{ background: '#25272c', flexShrink: 0 }} className="cancel-btn-dock">
        <div style={{ padding: '24px 80px 16px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }} className="cancel-btn-dock-inner">
          <button
            onClick={() => navigate('/subscription')}
            style={{ height: 48, background: 'transparent', color: '#f9f9f9', border: '2px solid #6f717b', borderRadius: 8, fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', padding: '0 24px', whiteSpace: 'nowrap' }}
          >
            Keep Subscription
          </button>
          <button
            onClick={() => navigate('/cancel')}
            style={{ height: 48, background: '#f9f9f9', color: '#17171b', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', padding: '0 24px', whiteSpace: 'nowrap' }}
          >
            Continue to Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
