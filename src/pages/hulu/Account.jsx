import { useNavigate, Navigate } from 'react-router-dom'
import HuluNav from '../../components/HuluNav'
import { useApp } from '../../context/AppContext'

function ActionLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontSize: 14, fontWeight: 500, lineHeight: '16px', color: '#0F5ABD', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit', padding: 0 }}
    >
      {children}
    </button>
  )
}

function SectionLabel({ children }) {
  return (
    <span style={{ color: '#0D0E11', fontSize: 14, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.16px' }}>
      {children}
    </span>
  )
}

function HuluDivider() {
  return <div style={{ height: 1, background: '#e9ebf0', margin: '24px 0' }} />
}

function HuluRow({ children, top }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: top ? '0' : '6px 0' }}>
      {children}
    </div>
  )
}

function HuluCard({ title, children }) {
  return (
    <div style={{ background: 'white', borderRadius: 12, border: 'none', overflow: 'hidden' }}>
      {title && <div style={{ fontSize: 20, fontWeight: 600, lineHeight: '28px', color: '#252526', padding: '20px 20px 8px' }}>{title}</div>}
      <div style={{ padding: '0 20px 20px' }}>
        {children}
      </div>
    </div>
  )
}

export default function HuluAccount() {
  const navigate = useNavigate()
  const { isLoggedIn, user } = useApp()

  if (!isLoggedIn) return <Navigate to="/hulu/login" replace />

  return (
    <div style={{ fontFamily: 'Graphik, system-ui, sans-serif', background: '#f1f2f4', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#252526' }}>
      <HuluNav />

      {/* White page header — continuous with nav */}
      <div style={{ background: 'white' }}>
        <div style={{ padding: '32px 80px 0', borderBottom: '1px solid #d3d7df' }} className="hulu-header-responsive">
          <h1 style={{ fontSize: 32, fontWeight: 600, lineHeight: '40px', color: '#252526', marginBottom: 0 }}>
            Manage your account
          </h1>
          {/* Tabs */}
          <div style={{ display: 'flex', margin: '8px 0 0' }}>
            <button style={{ padding: '16px 12px', marginRight: 24, fontSize: 16, fontWeight: 500, lineHeight: '24px', color: '#252526', cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'inherit', position: 'relative' }}>
              Overview
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(18, 186, 105, 1)', borderRadius: '3px 3px 0 0' }} />
            </button>
            <button style={{ padding: '16px 12px', marginRight: 24, fontSize: 16, fontWeight: 400, lineHeight: '24px', color: 'rgba(66, 72, 87, 1)', cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'inherit' }}>
              Profiles
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 80px 80px' }} className="hulu-body-responsive">

        {/* 3-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }} className="hulu-grid-responsive">

          {/* ── LEFT: Your Plan ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <HuluCard title="Your plan">
              {/* Plan header */}
              <HuluRow top>
                <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M47.8345 12.9705V19.7616C47.8345 22.2581 46.4123 23.9804 44.0365 23.9804V24H40.317C37.7391 24 35.9944 22.5386 35.9944 19.7616V12.9705H39.7924V19.439C39.7924 20.0112 40.2468 20.4769 40.8107 20.4769H43.021C43.582 20.4769 44.0365 20.014 44.0365 19.439V12.9705H47.8345ZM29.2903 24H33.1164V8H29.2903V23.9972V24ZM22.6311 19.439C22.6311 20.0112 22.1767 20.4769 21.6157 20.4769H19.4053C18.8443 20.4769 18.3871 20.014 18.3871 19.439V12.9705H14.5891V19.7616C14.5891 22.5386 16.3338 24 18.9116 24H22.6311V23.9804C25.007 23.9804 26.4292 22.2609 26.4292 19.7616V12.9705H22.6311V19.439ZM7.51473 12.993H5.07995C4.22441 12.993 3.79523 13.2258 3.79523 13.2258V8H0V23.9972H3.79523V17.5428C3.79523 16.9705 4.25246 16.5105 4.81346 16.5105H7.02384C7.58766 16.5105 8.04208 16.9734 8.04208 17.5428V23.9972H11.8401V17.0407C11.8401 14.115 9.92146 12.9902 7.51754 12.9902L7.51473 12.993Z" fill="#00BF6F"/>
                </svg>
                <ActionLink>Change</ActionLink>
              </HuluRow>

              {/* Plan row */}
              <HuluRow>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#252526' }}>Hulu Premium</span>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: 'rgba(13, 14, 17, 1)', whiteSpace: 'nowrap' }}>${user.huluPlan.price.toFixed(2)}/mo</span>
              </HuluRow>

              <HuluDivider />

              {/* Extra Member */}
              <HuluRow>
                <SectionLabel>Extra Member</SectionLabel>
                <ActionLink>Invite</ActionLink>
              </HuluRow>
              <p style={{ fontSize: 13, fontWeight: 400, lineHeight: '18px', color: 'rgba(66, 72, 87, 1)', padding: '4px 0 6px' }}>
                Add a family member or friend to your plan, even if they live outside your household.
              </p>

              <HuluDivider />

              {/* Add-ons */}
              <HuluRow>
                <SectionLabel>Add-ons</SectionLabel>
                <ActionLink>Manage</ActionLink>
              </HuluRow>
              <HuluRow>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#252526' }}>{user.addOns[0].name}</span>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: 'rgba(13, 14, 17, 1)', whiteSpace: 'nowrap' }}>${user.addOns[0].price.toFixed(2)}/mo</span>
              </HuluRow>
            </HuluCard>

            {/* Change plan / upgrade card */}
            <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ overflow: 'hidden', lineHeight: 0 }}>
                <img src="/images/plan-image.png" alt="Disney+ Hulu ESPN+ Bundle" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', cursor: 'pointer', borderTop: '1px solid #e9ebf0' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div>
                  <h4 style={{ fontSize: 20, fontWeight: 600, color: '#252526', lineHeight: '24px', marginBottom: 4 }}>Change your plan</h4>
                  <p style={{ fontSize: 13, fontWeight: 400, color: '#5f6166', lineHeight: '18px' }}>Looking for something new to stream?<br />Choose a bundle that works for you.</p>
                </div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="#252526" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── MIDDLE: Billing + Payment ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Billing card */}
            <HuluCard title="Billing">
              <HuluRow top>
                <SectionLabel>Upcoming charge</SectionLabel>
                <ActionLink>View Charges</ActionLink>
              </HuluRow>
              <div style={{ fontSize: 16, fontWeight: 400, color: '#252526', margin: '2px 0' }}>${user.upcomingCharge.amount.toFixed(2)} on {user.upcomingCharge.date}</div>
              <div style={{ fontSize: 12, fontWeight: 400, color: '#5f6166', marginBottom: 6 }}>includes taxes</div>

              <HuluDivider />

              <HuluRow>
                <SectionLabel>Last payment</SectionLabel>
                <ActionLink>View History</ActionLink>
              </HuluRow>
              <div style={{ fontSize: 16, fontWeight: 400, color: '#252526', margin: '2px 0' }}>${user.billingHistory[0].total.toFixed(2)} on {user.billingHistory[0].date}</div>
            </HuluCard>

            {/* Payment info card */}
            <HuluCard title="Payment info">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <SectionLabel>Payment method</SectionLabel>
                <ActionLink>Change</ActionLink>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
                <img
                  src={user.payment.iconUrl}
                  alt="Disney Visa"
                  style={{ height: 24, maxHeight: 24, width: 'auto', maxWidth: 60, objectFit: 'contain' }}
                />
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#252526' }}>••••{user.payment.last4}</span>
              </div>

              <HuluDivider />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                <SectionLabel>Gift card <span style={{ fontSize: 13, color: '#86898f' }}>ⓘ</span></SectionLabel>
                <ActionLink>Add</ActionLink>
              </div>

              <HuluDivider />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <SectionLabel>Promotional code <span style={{ fontSize: 13, color: '#86898f' }}>ⓘ</span></SectionLabel>
                <ActionLink>Redeem</ActionLink>
              </div>
            </HuluCard>

            {/* Pause/Cancel card */}
            <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', paddingTop: 24 }}>
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SectionLabel>Pause your subscription</SectionLabel>
                  <ActionLink>Pause</ActionLink>
                </div>

                <HuluDivider />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SectionLabel>Cancel your subscription</SectionLabel>
                  <ActionLink>Cancel</ActionLink>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: MyDisney + Your Account ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* MyDisney card */}
            <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '20px 20px 20px' }}>
                <div style={{ height: 36, display: 'flex', alignItems: 'center', marginBottom: 12, overflow: 'hidden' }}>
                  <img
                    src="/logos/mydisney.svg"
                    alt="MyDisney"
                    style={{ height: 36, maxHeight: 36, width: 'auto', maxWidth: 220, display: 'block', objectFit: 'contain', flexShrink: 0 }}
                  />
                </div>
                <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#252526' }}>
                  {user.email}<br />Password: ••••••••••
                </div>
                <div
                  onClick={() => navigate('/')}
                  style={{ fontSize: 14, fontWeight: 600, color: '#0F5ABD', cursor: 'pointer', textAlign: 'right', padding: '4px 0', marginTop: 12 }}
                >
                  Manage with MyDisney
                </div>
              </div>
            </div>

            {/* Your account card */}
            <HuluCard title="Your account">
              <HuluRow top>
                <SectionLabel>Personal info</SectionLabel>
                <ActionLink>Update</ActionLink>
              </HuluRow>
              <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#252526', padding: '4px 0 0' }}>
                {user.name}<br />{user.dob}<br />{user.gender}
              </div>

              <HuluDivider />

              <HuluRow>
                <SectionLabel>Add your devices</SectionLabel>
                <ActionLink>Manage Devices</ActionLink>
              </HuluRow>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input
                  type="text"
                  placeholder="Enter Code"
                  style={{ flex: 1, background: '#f1f2f4', border: '1px solid #d3d7df', borderRadius: 8, padding: '12px 16px', fontSize: 16, color: '#5f6166', fontFamily: 'inherit', outline: 'none' }}
                />
                <button style={{ width: 48, height: 48, minWidth: 48, background: '#252526', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 12C3 12.5523 3.44772 13 4 13H17.7962L12.2474 19.3415C11.8837 19.7571 11.9259 20.3889 12.3415 20.7526C12.7571 21.1163 13.3889 21.0742 13.7526 20.6585L20.7526 12.6585C21.0825 12.2815 21.0825 11.7185 20.7526 11.3415L13.7526 3.34151C13.3889 2.92587 12.7571 2.88375 12.3415 3.24744C11.9259 3.61112 11.8837 4.24288 12.2474 4.65852L17.7962 11H4C3.44772 11 3 11.4477 3 12Z" fill="white"/>
                  </svg>
                </button>
              </div>

              <HuluDivider />

              <div style={{ color: '#0D0E11', fontSize: 14, fontWeight: 500, lineHeight: '16px', letterSpacing: '0.16px', padding: '4px 0 8px' }}>Privacy and settings</div>
              <a href="#" style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#0F5ABD', display: 'block', padding: '2px 0', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >Your US State Privacy Rights</a>
              <a href="#" style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#0F5ABD', display: 'block', padding: '2px 0', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >Manage Email Notifications</a>
              <a href="#" style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#0F5ABD', display: 'block', padding: '2px 0', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >View Subscriber Agreement</a>
              <a
                href="#"
                onClick={e => { e.preventDefault(); navigate('/nielsen') }}
                style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#0F5ABD', display: 'block', padding: '2px 0', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >Manage Nielsen Measurement</a>
            </HuluCard>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hulu-grid-responsive { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 767px) {
          .hulu-grid-responsive { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .hulu-body-responsive { padding: 24px 32px 60px !important; }
          .hulu-header-responsive { padding: 24px 32px 0 !important; }
        }
        @media (max-width: 600px) {
          .hulu-body-responsive { padding: 16px 24px 48px !important; }
          .hulu-header-responsive { padding: 16px 24px 0 !important; }
        }
      `}</style>
    </div>
  )
}
