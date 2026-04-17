import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'
import { useApp } from '../../context/AppContext'

const imgSuccessIcon = 'https://www.figma.com/api/mcp/asset/76dccb3b-c61d-41b8-95ad-b9be6fd6344d'

const SURVEY_OPTIONS = [
  'Wanted to temporarily pause my account',
  'Too much buffering or poor video quality',
  'Billing confusion',
  'Watched everything I wanted to',
  "Didn't find the movies and shows I was looking for",
  'No longer want a Disney Bundle',
  'Had difficulty navigating Disney+',
  'Too expensive/can no longer afford',
  'Technical issues',
  'Getting Disney+ through another provider',
  'Other',
]

function RadioOption({ label, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      style={{ display: 'flex', alignItems: 'center', gap: 0, cursor: 'pointer', padding: '0' }}
    >
      <div style={{ flexShrink: 0, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: selected ? '#056d84' : 'transparent',
          border: selected ? 'none' : '1.5px solid #6b7a94',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {selected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
        </div>
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#a6afbf', flex: 1 }}>{label}</span>
    </div>
  )
}

export default function CancelSurvey() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [selected, setSelected] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const cancelDate = user.upcomingCharge.date

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 80px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 628 }}>

          {/* Headline */}
          <div style={{ paddingBottom: 20 }}>
            <div style={{ fontSize: 28, fontWeight: 600, lineHeight: '36px', color: '#f9f9f9', marginBottom: 16 }}>
              Ok, your subscription has been canceled
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#b7b8bd' }}>
              We've sent a confirmation to your email on file. You may continue to watch Disney+ until {cancelDate}.
            </div>
          </div>

          {submitted ? (
            /* Survey submitted state */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#0d522f', borderRadius: 8, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', paddingRight: 24 }}>
                  <div style={{ padding: '16px 12px 16px 24px', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: 24, height: 24, flexShrink: 0,
                      background: '#c2edd8',
                      WebkitMaskImage: `url('${imgSuccessIcon}')`,
                      maskImage: `url('${imgSuccessIcon}')`,
                      WebkitMaskSize: '24px 24px',
                      maskSize: '24px 24px',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: '0px 0px',
                      maskPosition: '0px 0px',
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, paddingTop: 16, paddingBottom: 16 }}>
                    <p style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', color: '#f9f9f9', margin: 0 }}>
                      Thanks for your feedback!
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#33ddff', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
              >
                Back to Account
              </button>
            </div>
          ) : (
            /* Survey form */
            <div>
              <div style={{ paddingTop: 24, paddingBottom: 8 }}>
                <div style={{ fontSize: 20, fontWeight: 600, lineHeight: '24px', color: '#f7f8fa', marginBottom: 16 }}>
                  Please tell us why you canceled (optional)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {SURVEY_OPTIONS.map((option, i) => (
                    <RadioOption
                      key={option}
                      label={option}
                      selected={selected === i}
                      onSelect={() => setSelected(i)}
                    />
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 411, margin: '0 auto', paddingTop: 8 }}>
                <button
                  onClick={() => setSubmitted(true)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: 48, background: 'transparent', color: '#f7f8fa', border: '2px solid #6b7a94', borderRadius: 8, fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer' }}
                >
                  Submit
                </button>
                <button
                  onClick={() => navigate('/')}
                  style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#33ddff', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  Back to Account
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
