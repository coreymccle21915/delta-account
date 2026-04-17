import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'

const imgSwitch = 'https://www.figma.com/api/mcp/asset/c74b4cb9-d8f1-4137-aff0-5bfe6a0891c3'
const imgCalendar = 'https://www.figma.com/api/mcp/asset/9ee70e34-75e5-42be-96f8-abbd5729b99e'
const imgContent = 'https://www.figma.com/api/mcp/asset/70a0aba1-cecb-4925-bdb8-f24cd26d3fa9'
const imgSupport = 'https://www.figma.com/api/mcp/asset/6408d92c-44a9-4e87-9898-85119aed3c02'

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M9 18L15 12L9 6" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SelectionCard({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'flex-start', gap: 16, width: '100%', background: '#1a1d23', borderRadius: 4, padding: 16, border: 'none', cursor: 'pointer', textAlign: 'left' }}
    >
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
        <img src={icon} alt="" style={{ width: 36, height: 36, display: 'block' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.16px', color: '#f9f9f9' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#b7b8bd', marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', alignSelf: 'stretch' }}>
        <ChevronRight />
      </div>
    </button>
  )
}

export default function CancelLanding() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#15181e', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 40px' }} className="page-body-responsive">
        <div style={{ width: '100%', maxWidth: 628 }}>

          {/* Breadcrumb */}
          <button
            onClick={() => navigate('/subscription')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, height: 32, marginBottom: 24, background: 'none', border: 'none', padding: '8px 12px', cursor: 'pointer', marginLeft: -12 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 13L5 8L10 3" stroke="#f9f9f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 14, fontWeight: 700, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>Back</span>
          </button>

          {/* Headline */}
          <div style={{ paddingBottom: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 600, lineHeight: '40px', color: '#f7f8fa', marginBottom: 8 }}>
              Here's an offer for being a loyal member
            </div>
            <div style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#a6afbf' }}>
              Cancellation will take effect at the end of your current billing period.
            </div>
          </div>

          {/* Subhead */}
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: '24px', color: '#f9f9f9', paddingBottom: 16 }}>
            Not ready to cancel? Here are some other options to explore.
          </div>

          {/* Selection Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <SelectionCard
              icon={imgSwitch}
              title="Get Disney+ Basic for $7.99 per month"
              subtitle="Don't miss out on this special offer! After promotion period ends, plan auto-renews at then-current monthly retail price until canceled. Price subject to change."
              onClick={() => {}}
            />
            <SelectionCard
              icon={imgCalendar}
              title="Pause your subscription instead"
              subtitle="Need a break? Schedule a temporary pause. Resume anytime."
              onClick={() => navigate('/pause')}
            />
            <SelectionCard
              icon={imgContent}
              title="See what you'll be missing"
              subtitle="Want more to watch? Add Hulu and ESPN+ for $X/month."
              onClick={() => {}}
            />
            <SelectionCard
              icon={imgSupport}
              title="Get support"
              subtitle="Have an issue? We can help"
              onClick={() => {}}
            />
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
            onClick={() => navigate('/cancel/survey')}
            style={{ height: 48, background: '#f9f9f9', color: '#17171b', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', padding: '0 24px', whiteSpace: 'nowrap' }}
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  )
}
