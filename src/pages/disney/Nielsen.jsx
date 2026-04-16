import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DisneyNav from '../../components/DisneyNav'

export default function Nielsen() {
  const navigate = useNavigate()
  const [checked, setChecked] = useState(true)

  return (
    <div style={{ fontFamily: 'InspireTWDC, system-ui, sans-serif', background: '#17171b', color: '#f9f9f9', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DisneyNav />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 80px 80px' }} className="page-body-responsive">
        <div style={{ maxWidth: 411, width: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>

          <div>
            <h1 style={{ fontSize: 44, fontWeight: 600, lineHeight: '52px', letterSpacing: '-0.16px', color: '#f9f9f9', paddingBottom: 24 }}>
              Manage Nielsen<br />Measurement
            </h1>
            <p style={{ fontSize: 18, fontWeight: 400, lineHeight: '28px', color: '#b7b8bd' }}>
              The Disney+ service may feature Nielsen proprietary measurement software
              such as Nielsen Digital Ad Ratings (DAR) when you stream Disney+, including
              on your television through streaming media players, smart TVs, Chromecast,
              Blu-ray players, gaming consoles, and similar devices (collectively,
              "Living Room Devices") and mobile applications. Nielsen DAR allows
              Nielsen to measure the performance of ad campaigns viewed by our registered
              users. If you do not wish to participate in DAR on Living Room Devices and
              mobile applications, please indicate your preference by unchecking the box
              below. For more information about other Nielsen measurement software
              featured on the Disney+ service, such as TV ratings and the ability to
              opt-out, please visit our Privacy Policy.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <input
              type="checkbox"
              id="nielsen-check"
              checked={checked}
              onChange={e => setChecked(e.target.checked)}
              style={{ width: 20, height: 20, minWidth: 20, cursor: 'pointer', marginTop: 2, accentColor: '#056d84' }}
            />
            <label htmlFor="nielsen-check" style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#f9f9f9', cursor: 'pointer' }}>
              Participate in Nielsen Digital Ad Ratings (DAR)
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <button
              onClick={() => navigate('/')}
              style={{ flex: 1, background: '#3c3e48', color: '#f9f9f9', border: 'none', borderRadius: 8, height: 48, fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Cancel
            </button>
            <button
              onClick={() => navigate('/')}
              style={{ flex: 1, background: '#3c3e48', color: '#f9f9f9', border: 'none', borderRadius: 8, height: 48, fontSize: 16, fontWeight: 600, lineHeight: '24px', letterSpacing: '0.16px', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
