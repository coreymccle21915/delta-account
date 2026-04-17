import { useState } from 'react'
import DisneyNav from '../../components/DisneyNav'
import { useApp } from '../../context/AppContext'

const ROWS_PER_PAGE = 10
const BILLING_DAY = 15

// Returns the most recent billing date (on or before today)
function getMostRecentBillingDate() {
  const today = new Date()
  const d = new Date(today.getFullYear(), today.getMonth(), BILLING_DAY)
  return d <= today ? d : new Date(today.getFullYear(), today.getMonth() - 1, BILLING_DAY)
}

function formatDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function generateHistory(count, total, desc) {
  const base = getMostRecentBillingDate()
  return Array.from({ length: count }, (_, i) => ({
    date: formatDate(new Date(base.getFullYear(), base.getMonth() - i, BILLING_DAY)),
    desc,
    total,
  }))
}

function generateUpcoming(count, total, desc) {
  const base = getMostRecentBillingDate()
  return Array.from({ length: count }, (_, i) => ({
    date: formatDate(new Date(base.getFullYear(), base.getMonth() + i + 1, BILLING_DAY)),
    desc,
    total,
  }))
}

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.46967 13.197C5.17678 12.9041 5.17678 12.4292 5.46967 12.1363L9.60601 8L5.46967 3.86366C5.17678 3.57077 5.17678 3.09589 5.46967 2.803C5.76256 2.51011 6.23744 2.51011 6.53033 2.803L11.197 7.46967C11.4899 7.76256 11.4899 8.23743 11.197 8.53033L6.53033 13.197C6.23744 13.4899 5.76256 13.4899 5.46967 13.197Z" fill="#F9F9F9"/>
  </svg>
)

function InvoiceModal({ row, user, onClose, isUpcoming }) {
  const invoiceNum = '#' + row.date.replace(/[, ]/g, '').toUpperCase() + 'A731AB5000308F74B'
  const subtotal = user.huluPlan.price + user.addOns[0].price
  const tax = Math.max(0, row.total - subtotal)

  return (
    <>
    <style>{`
      .invoice-overlay { align-items: center; padding: 24px 16px; }
      .invoice-card {
        border-radius: 12px; width: 442px; max-width: 442px;
        padding: 0 36px 36px 36px; margin-top: 72px;
        display: flex; flex-direction: column;
      }
      @media (max-width: 640px) {
        .invoice-overlay { align-items: flex-end !important; padding: 0 !important; }
        .invoice-card {
          border-radius: 20px 20px 0 0 !important;
          width: 100% !important; max-width: 100% !important;
          padding: 72px 24px 40px !important;
          margin-top: 0 !important;
        }
      }
    `}</style>
    <div
      onClick={onClose}
      className="invoice-overlay"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)',
        zIndex: 1000, display: 'flex', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="invoice-card"
        style={{
          background: '#ffffff', width: '100%',
          maxHeight: '90vh', overflowY: 'auto', position: 'relative',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
          fontFamily: 'InspireTWDC, system-ui, sans-serif',
          color: '#17171b',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 20, right: 20,
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, borderRadius: '50%',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#17171b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Header: title + invoice# left, Hulu logo right */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 0, paddingTop: 36 }}>
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
          {/* Hulu Premium line */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px' }}>Hulu Premium (Monthly)</span>
            <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', whiteSpace: 'nowrap', flexShrink: 0 }}>${user.huluPlan.price.toFixed(2)}</span>
          </div>
          <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#17171b', letterSpacing: 0, paddingLeft: 16 }}>Hulu Premium</p>
          {/* Max add-on line */}
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

        {/* Print button */}
        <button
          onClick={() => window.print()}
          style={{
            display: 'block', width: '100%', marginTop: 32,
            background: '#4b4e5a', color: '#f9f9f9', border: 'none', borderRadius: 8,
            minHeight: 48, padding: '12px 24px', fontSize: 16, fontWeight: 600, letterSpacing: '0.16px',
            cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center',
          }}
        >
          Print
        </button>
      </div>
    </div>
    </>
  )
}

export default function Billing() {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState('history')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalRow, setModalRow] = useState(null)
  const [modalIsUpcoming, setModalIsUpcoming] = useState(false)

  const BILLING_TOTAL = 41.42
  const BILLING_DESC = 'Hulu Premium & Max (Monthly, incl. tax)'

  const allRows = generateHistory(36, BILLING_TOTAL, BILLING_DESC)
  const upcomingRows = generateUpcoming(3, BILLING_TOTAL, BILLING_DESC)

  const totalPages = Math.ceil(allRows.length / ROWS_PER_PAGE)
  const start = (currentPage - 1) * ROWS_PER_PAGE
  const rows = allRows.slice(start, start + ROWS_PER_PAGE)

  function openInvoice(row, isUpcoming = false) {
    setModalRow(row)
    setModalIsUpcoming(isUpcoming)
  }

  function closeModal() {
    setModalRow(null)
    setModalIsUpcoming(false)
  }

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <style>{`
        .billing-row-left { display: flex; flex: 1; gap: 16px; }
        .billing-date-cell { width: 160px; flex-shrink: 0; }
        .billing-desc-cell { flex: 1; }
        @media (max-width: 640px) {
          .billing-desc-header { display: none !important; }
          .billing-row-left { flex-direction: column; gap: 2px; }
          .billing-date-cell { width: auto !important; }
          .billing-desc-cell { font-size: 14px !important; color: #b7b8bd !important; }
        }
      `}</style>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 80px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 845 }}>

          {/* Breadcrumb */}
          <button
            onClick={() => window.history.back()}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, cursor: 'pointer', width: '100%', marginBottom: 0, background: 'none', border: 'none', padding: 0, textAlign: 'left' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Back</span>
          </button>

          <div style={{ paddingTop: 8, paddingBottom: 20 }}>
            <h1 style={{ fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: 0, color: '#f9f9f9' }}>Billing</h1>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #4b4e5a', marginBottom: 24 }}>
            {['history', 'upcoming'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 12px 12px', fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px',
                  color: activeTab === tab ? '#f9f9f9' : '#b7b8bd',
                  cursor: 'pointer', background: 'none', border: 'none', position: 'relative', fontFamily: 'inherit',
                }}
              >
                {tab === 'history' ? 'Billing History' : 'Upcoming Charges'}
                {activeTab === tab && (
                  <div style={{ position: 'absolute', bottom: 0, left: 8, right: 8, height: 4, background: '#056d84', borderRadius: '4px 4px 0 0' }} />
                )}
              </button>
            ))}
          </div>

          {/* Billing History Panel */}
          {activeTab === 'history' && (
            <div style={{ background: '#1e1f24', borderRadius: 12, overflow: 'hidden', padding: '24px 24px 8px', width: '100%' }}>
              <div style={{ display: 'flex', gap: 16, paddingRight: 40, marginBottom: 0 }}>
                <div style={{ width: 160, flexShrink: 0, fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', padding: '8px 0' }}>Date</div>
                <div className="billing-desc-header" style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', padding: '8px 0' }}>Description</div>
                <div style={{ width: 100, flexShrink: 0, fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', padding: '8px 0', textAlign: 'right' }}>Total</div>
              </div>

              {rows.map((row, i) => (
                <div key={row.date + i}>
                  <div
                    onClick={() => openInvoice(row, false)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderRadius: 4 }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ flex: 1, display: 'flex', gap: 16, padding: '16px 0', alignItems: 'center' }}>
                      <div className="billing-row-left">
                        <div className="billing-date-cell" style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{row.date}</div>
                        <div className="billing-desc-cell" style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{row.desc}</div>
                      </div>
                      <div style={{ width: 100, flexShrink: 0, textAlign: 'right', fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', whiteSpace: 'nowrap' }}>${row.total.toFixed(2)}</div>
                    </div>
                    <div style={{ width: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 8 }}>
                      <ChevronRight />
                    </div>
                  </div>
                  {i < rows.length - 1 && (
                    <div style={{ height: 1, background: '#4b4e5a', opacity: 0.4 }} />
                  )}
                </div>
              ))}

              {/* Footer note */}
              <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#b7b8bd', padding: '8px 0 16px', textAlign: 'left' }}>
                Only your most recent invoice(s) are displayed.
              </p>

              {/* Pagination 
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', justifyContent: 'center' }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: currentPage === 1 ? 'default' : 'pointer', background: 'none', border: 'none', color: '#f9f9f9', opacity: currentPage === 1 ? 0.2 : 1, pointerEvents: currentPage === 1 ? 'none' : 'auto' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="#f9f9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <select
                    value={currentPage}
                    onChange={e => setCurrentPage(Number(e.target.value))}
                    style={{ background: '#3c3e48', color: '#f9f9f9', border: 'none', borderRadius: 8, padding: '0 12px 0 16px', height: 48, fontSize: 16, fontWeight: 600, fontFamily: 'inherit', appearance: 'none', width: 70, cursor: 'pointer' }}
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#f9f9f9', whiteSpace: 'nowrap' }}>of {totalPages}</span>
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: currentPage === totalPages ? 'default' : 'pointer', background: 'none', border: 'none', color: '#f9f9f9', opacity: currentPage === totalPages ? 0.2 : 1, pointerEvents: currentPage === totalPages ? 'none' : 'auto' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="#f9f9f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              */}
            </div>
          )}

          {/* Upcoming Charges Panel */}
          {activeTab === 'upcoming' && (
            <div style={{ background: '#1e1f24', borderRadius: 12, overflow: 'hidden', padding: '24px 24px 8px', width: '100%' }}>
              <div style={{ display: 'flex', gap: 16, paddingRight: 40, marginBottom: 0 }}>
                <div style={{ width: 160, flexShrink: 0, fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', padding: '8px 0' }}>Date</div>
                <div className="billing-desc-header" style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', padding: '8px 0' }}>Description</div>
                <div style={{ width: 100, flexShrink: 0, fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9', padding: '8px 0', textAlign: 'right' }}>Total</div>
              </div>

              {upcomingRows.map((row, i) => (
                <div key={row.date}>
                  <div
                    onClick={() => openInvoice(row, true)}
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', borderRadius: 4 }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ flex: 1, display: 'flex', gap: 16, padding: '16px 0', alignItems: 'center' }}>
                      <div className="billing-row-left">
                        <div className="billing-date-cell" style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{row.date}</div>
                        <div className="billing-desc-cell" style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9' }}>{row.desc}</div>
                      </div>
                      <div style={{ width: 100, flexShrink: 0, textAlign: 'right', fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', whiteSpace: 'nowrap' }}>${row.total.toFixed(2)}</div>
                    </div>
                    <div style={{ width: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 8 }}>
                      <ChevronRight />
                    </div>
                  </div>
                  {i < upcomingRows.length - 1 && (
                    <div style={{ height: 1, background: '#4b4e5a', opacity: 0.4 }} />
                  )}
                </div>
              ))}
              <div style={{ height: 16 }} />
            </div>
          )}

        </div>
      </div>

      {/* Invoice modal */}
      {modalRow && (
        <InvoiceModal
          row={modalRow}
          user={user}
          onClose={closeModal}
          isUpcoming={modalIsUpcoming}
        />
      )}
    </div>
  )
}
