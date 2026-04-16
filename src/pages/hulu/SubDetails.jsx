import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'
import { useApp } from '../../context/AppContext'

export default function SubDetails() {
  const navigate = useNavigate()
  const { user } = useApp()

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 80px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 628 }}>

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, cursor: 'pointer', width: '100%', marginBottom: 24, background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Back to Account</span>
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>

            {/* Subscription Card */}
            <div style={{ background: '#1e1f24', borderRadius: 12, overflow: 'hidden', width: '100%' }}>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#f9f9f9', paddingBottom: 16 }}>
                  Your Subscription
                </div>

                {/* Hulu logo + manage */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 8 }}>
                  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M47.8345 12.9705V19.7616C47.8345 22.2581 46.4123 23.9804 44.0365 23.9804V24H40.317C37.7391 24 35.9944 22.5386 35.9944 19.7616V12.9705H39.7924V19.439C39.7924 20.0112 40.2468 20.4769 40.8107 20.4769H43.021C43.582 20.4769 44.0365 20.014 44.0365 19.439V12.9705H47.8345ZM29.2903 24H33.1164V8H29.2903V23.9972V24ZM22.6311 19.439C22.6311 20.0112 22.1767 20.4769 21.6157 20.4769H19.4053C18.8443 20.4769 18.3871 20.014 18.3871 19.439V12.9705H14.5891V19.7616C14.5891 22.5386 16.3338 24 18.9116 24H22.6311V23.9804C25.007 23.9804 26.4292 22.2609 26.4292 19.7616V12.9705H22.6311V19.439ZM7.51473 12.993H5.07995C4.22441 12.993 3.79523 13.2258 3.79523 13.2258V8H0V23.9972H3.79523V17.5428C3.79523 16.9705 4.25246 16.5105 4.81346 16.5105H7.02384C7.58766 16.5105 8.04208 16.9734 8.04208 17.5428V23.9972H11.8401V17.0407C11.8401 14.115 9.92146 12.9902 7.51754 12.9902L7.51473 12.993Z" fill="#1CE682"/>
                  </svg>
                  <div
                    onClick={() => window.open('/hulu/account', '_blank')}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#33ddff', fontSize: 14, fontWeight: 700, lineHeight: '16px', cursor: 'pointer' }}
                  >
                    <span>Manage</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M9 3L13 3M13 3L13 7M13 3L7 9M5 4H3V13H12V11" stroke="#33ddff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Plan row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '4px 0 0 0' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{user.huluPlan.name}</div>
                    <div style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#b7b8bd' }}>Manage on Hulu</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', whiteSpace: 'nowrap', textAlign: 'right', minWidth: 80 }}>
                    ${user.huluPlan.price.toFixed(2)}<span style={{ color: '#b7b8bd', fontSize: 14 }}>/mo</span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ padding: '24px 0' }}>
                  <div style={{ height: 1, background: '#4b4e5a', opacity: 0.5 }} />
                </div>

                {/* Add-ons */}
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', paddingBottom: 8 }}>Add-ons</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '4px 0' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{user.addOns[0].name}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', whiteSpace: 'nowrap', textAlign: 'right', minWidth: 80 }}>
                    ${user.addOns[0].price.toFixed(2)}<span style={{ color: '#b7b8bd', fontSize: 14 }}>/mo</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Billing & Payments Card */}
            <div style={{ background: '#1e1f24', borderRadius: 12, overflow: 'hidden', width: '100%' }}>
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 24, fontWeight: 600, lineHeight: '32px', letterSpacing: 0, color: '#f9f9f9', paddingBottom: 16 }}>
                  Billing &amp; Payments
                </div>

                {/* Payment method */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Payment method</span>
                  <span
                    onClick={() => navigate('/payment')}
                    style={{ fontSize: 14, fontWeight: 700, lineHeight: '16px', letterSpacing: '0.16px', color: '#33ddff', cursor: 'pointer' }}
                  >Change</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                  <div style={{ height: 24, width: 36, flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <img
                      src={user.payment.iconUrl}
                      alt="Payment icon"
                      style={{ height: 24, maxHeight: 24, width: 'auto', maxWidth: 60, objectFit: 'contain', display: 'block' }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>••••{user.payment.last4}</span>
                </div>

                {/* Divider */}
                <div style={{ padding: '24px 0' }}>
                  <div style={{ height: 1, background: '#4b4e5a', opacity: 0.5 }} />
                </div>

                {/* Upcoming Charge */}
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', paddingBottom: 8 }}>Upcoming Charge</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '4px 0' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{user.upcomingCharge.date}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', whiteSpace: 'nowrap', textAlign: 'right', minWidth: 80 }}>
                    ${user.upcomingCharge.amount.toFixed(2)}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ padding: '24px 0' }}>
                  <div style={{ height: 1, background: '#4b4e5a', opacity: 0.5 }} />
                </div>

                {/* Last Payment */}
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', paddingBottom: 8 }}>Last Payment</div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, padding: '4px 0' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{user.billingHistory[0].date}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', whiteSpace: 'nowrap', textAlign: 'right', minWidth: 80 }}>
                    ${user.billingHistory[0].total.toFixed(2)}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
