import DisneyPlusLogo from './DisneyPlusLogo'
import { useApp } from '../context/AppContext'

export default function DisneyNav() {
  const { user } = useApp()
  return (
    <nav style={{ background: 'unset', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px', flexShrink: 0 }}
      className="responsive-nav">
      <DisneyPlusLogo style={{ height: 40, width: 'auto' }} className="h-10 w-auto" />
      <button style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <span style={{ fontSize: 14, fontWeight: 600, lineHeight: '16px', letterSpacing: '0.16px', color: '#f9f9f9' }}>
          {user.name.split(' ')[0]}
        </span>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 32, maxWidth: 32, height: 32, maxHeight: 32, borderRadius: '50%', objectFit: 'cover' }}
          onError={e => { e.target.style.background = '#2d2f36'; e.target.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' }}
        />
      </button>
    </nav>
  )
}
