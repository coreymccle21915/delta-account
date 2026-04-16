import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'

const fieldStyle = {
  background: '#1e1f24',
  border: '1.5px solid #4b4e5a',
  borderRadius: 8,
  padding: '12px 16px',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: '24px',
  color: '#f9f9f9',
  outline: 'none',
  width: '100%',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

export default function Payment() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('card')

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 80px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 628 }}>

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/subscription')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, cursor: 'pointer', width: '100%', marginBottom: 20, background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Back</span>
          </button>

          <div style={{ paddingBottom: 20 }}>
            <h1 style={{ fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: 0, color: '#f9f9f9' }}>
              Change payment info
            </h1>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #6f717b', width: '100%' }}>
            <button
              onClick={() => setActiveTab('card')}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '8px 4px 0', cursor: 'pointer', border: 'none', background: 'none', position: 'relative' }}
            >
              <img
                src="/logos/payment-credit-card.svg"
                alt="Credit Card"
                style={{ width: 24, height: 24, display: 'block', flexShrink: 0 }}
              />
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', color: activeTab === 'card' ? '#f9f9f9' : '#b7b8bd', paddingBottom: 4 }}>
                Credit Card
              </span>
              <div style={{ height: 4, width: '100%', borderRadius: '4px 4px 0 0', background: activeTab === 'card' ? '#056d84' : 'transparent' }} />
            </button>
            <button
              onClick={() => setActiveTab('paypal')}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '8px 4px 0', cursor: 'pointer', border: 'none', background: 'none', position: 'relative' }}
            >
              <img
                src="/logos/payment-paypal.svg"
                alt="PayPal"
                style={{ width: 24, height: 24, display: 'block', flexShrink: 0 }}
              />
              <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', color: activeTab === 'paypal' ? '#f9f9f9' : '#b7b8bd', paddingBottom: 4 }}>
                PayPal
              </span>
              <div style={{ height: 4, width: '100%', borderRadius: '4px 4px 0 0', background: activeTab === 'paypal' ? '#056d84' : 'transparent' }} />
            </button>
          </div>

          {/* Credit Card Panel */}
          {activeTab === 'card' && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0 16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Name on Card</label>
                  <input style={fieldStyle} type="text" defaultValue="Alex Roberts" placeholder="Name on card" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input style={{ ...fieldStyle, paddingRight: 180 }} type="text" placeholder="" />
                    <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 3 }}>
                      <img src="/logos/card-visa.svg" alt="Visa" style={{ height: 22, width: 'auto', maxWidth: 50, display: 'block', flexShrink: 0 }} />
                      <img src="/logos/card-mastercard.svg" alt="Mastercard" style={{ height: 22, width: 'auto', maxWidth: 50, display: 'block', flexShrink: 0 }} />
                      <img src="/logos/card-amex.svg" alt="Amex" style={{ height: 22, width: 'auto', maxWidth: 50, display: 'block', flexShrink: 0 }} />
                      <img src="/logos/card-discover.svg" alt="Discover" style={{ height: 22, width: 'auto', maxWidth: 50, display: 'block', flexShrink: 0 }} />
                      <img src="/logos/card-disney-visa.svg" alt="Disney Visa" style={{ height: 22, width: 'auto', maxWidth: 50, display: 'block', flexShrink: 0 }} />
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16 }} className="field-row-responsive">
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Expiration Date</label>
                    <input style={fieldStyle} type="text" placeholder="MM/YY" />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Security Code</label>
                    <input style={fieldStyle} type="text" placeholder="CVV" />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>ZIP Code</label>
                  <input style={fieldStyle} type="text" placeholder="ZIP code" />
                </div>
              </div>
              <button
                onClick={() => navigate('/subscription')}
                style={{ display: 'block', width: '100%', maxWidth: 411, margin: '0 auto', background: '#f9f9f9', color: '#17171b', border: 'none', borderRadius: 8, padding: '12px 24px', fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center' }}
              >
                Save Changes
              </button>
            </div>
          )}

          {/* PayPal Panel */}
          {activeTab === 'paypal' && (
            <div style={{ padding: '24px 0' }}>
              <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#b7b8bd', marginBottom: 16 }}>
                Change payment with PayPal. To change payment, click the PayPal button and log in to PayPal using your email and password.
              </p>
              <button
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%', maxWidth: 411, margin: '0 auto', height: 48,
                  background: '#f7f8fa', border: 'none', borderRadius: 4,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: 16, fontWeight: 600, color: '#15181e' }}>Pay with</span>
                <img
                  src="/logos/paypal-wordmark.svg"
                  alt="PayPal"
                  style={{ height: 20, width: 'auto', display: 'block' }}
                />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
