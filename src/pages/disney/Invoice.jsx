import { useNavigate, useLocation } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'
import { useApp } from '../../context/AppContext'

export default function Invoice() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useApp()
  const row = location.state?.row || { date: 'Apr 15, 2026', desc: 'Hulu Premium & Max (Monthly, incl. tax)', total: 41.42 }
  const isUpcoming = location.state?.isUpcoming || false
  const invoiceNum = '#' + row.date.replace(/[, ]/g, '').toUpperCase() + 'A731AB5000308F74B'
  const subtotal = user.huluPlan.price + user.addOns[0].price
  const tax = Math.max(0, row.total - subtotal)

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 80px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 845 }}>

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/billing')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, cursor: 'pointer', width: '100%', marginBottom: 24, background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Back to Billing</span>
          </button>

          {/* Invoice card */}
          <div style={{
            background: '#ffffff', borderRadius: 12, width: '100%', maxWidth: 560,
            margin: '0 auto', position: 'relative', padding: '32px 32px 32px',
            color: '#17171b',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, paddingRight: 16 }}>
                <p style={{ fontSize: 18, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', color: '#17171b', marginBottom: 4 }}>
                  {isUpcoming ? 'Upcoming charge' : 'Tax invoice'}
                </p>
                {!isUpcoming && (
                  <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#17171b', wordBreak: 'break-all' }}>
                    {invoiceNum}
                  </p>
                )}
              </div>
              <svg width="60" height="40" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <path d="M47.8345 12.9705V19.7616C47.8345 22.2581 46.4123 23.9804 44.0365 23.9804V24H40.317C37.7391 24 35.9944 22.5386 35.9944 19.7616V12.9705H39.7924V19.439C39.7924 20.0112 40.2468 20.4769 40.8107 20.4769H43.021C43.582 20.4769 44.0365 20.014 44.0365 19.439V12.9705H47.8345ZM29.2903 24H33.1164V8H29.2903V23.9972V24ZM22.6311 19.439C22.6311 20.0112 22.1767 20.4769 21.6157 20.4769H19.4053C18.8443 20.4769 18.3871 20.014 18.3871 19.439V12.9705H14.5891V19.7616C14.5891 22.5386 16.3338 24 18.9116 24H22.6311V23.9804C25.007 23.9804 26.4292 22.2609 26.4292 19.7616V12.9705H22.6311V19.439ZM7.51473 12.993H5.07995C4.22441 12.993 3.79523 13.2258 3.79523 13.2258V8H0V23.9972H3.79523V17.5428C3.79523 16.9705 4.25246 16.5105 4.81346 16.5105H7.02384C7.58766 16.5105 8.04208 16.9734 8.04208 17.5428V23.9972H11.8401V17.0407C11.8401 14.115 9.92146 12.9902 7.51754 12.9902L7.51473 12.993Z" fill="#00BF6F"/>
              </svg>
            </div>

            {/* Date row */}
            <div style={{ display: 'flex', alignItems: 'center', height: 71, borderBottom: '4px solid #b7b8bd' }}>
              <p style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#17171b' }}>{row.date}</p>
            </div>

            {/* Subscription section */}
            <div style={{ padding: '20px 0', borderBottom: '1px solid #b7b8bd', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px' }}>Hulu Premium (Monthly)</span>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${user.huluPlan.price.toFixed(2)}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#17171b', letterSpacing: 0, paddingLeft: 16 }}>Hulu Premium</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginTop: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px' }}>Max (No Ads) add-on (Monthly)</span>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${user.addOns[0].price.toFixed(2)}</span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#17171b', letterSpacing: 0, paddingLeft: 16 }}>Max (No Ads)</p>
            </div>

            {/* Taxes section */}
            <div style={{ padding: '20px 0', borderBottom: '1px solid #b7b8bd', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px' }}>Taxes</span>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#17171b', letterSpacing: 0, paddingLeft: 16 }}>Sales and Use Tax – 7.00%</span>
                <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#17171b', letterSpacing: 0, whiteSpace: 'nowrap', flexShrink: 0 }}>${tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Summary rows */}
            <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px' }}>Subtotal</span>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px' }}>Tax Total</span>
                <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Order total */}
            <div style={{ padding: '0 0 20px', borderBottom: '1px solid #b7b8bd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px' }}>Order Total</p>
                  {!isUpcoming && (
                    <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#6f717b', marginTop: 2 }}>
                      {user.payment.type.toUpperCase()} **{user.payment.last4}
                    </p>
                  )}
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${row.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Business entity */}
            <div style={{ padding: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px' }}>Disney Platform Distribution, Inc.</p>
              <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#6f717b' }}>500 S Buena Vista St.</p>
              <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#6f717b' }}>Burbank, CA 91521</p>
            </div>

            <button
              onClick={() => window.print()}
              style={{ display: 'block', width: '100%', marginTop: 32, background: '#4b4e5a', color: '#f9f9f9', border: 'none', borderRadius: 8, height: 48, fontSize: 16, fontWeight: 600, letterSpacing: '0.16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}
            >
              Print
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
