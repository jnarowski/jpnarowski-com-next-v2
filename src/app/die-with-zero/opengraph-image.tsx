import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Die with Zero Calculator - Net Worth Projection Tool'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            borderRadius: '24px',
            padding: '60px',
            boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Die with Zero Calculator
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#64748b',
              marginBottom: '40px',
              textAlign: 'center',
            }}
          >
            Plan Your Financial Future
          </p>
          <div
            style={{
              display: 'flex',
              gap: '40px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 40px',
                background: '#f8fafc',
                borderRadius: '16px',
              }}
            >
              <div style={{ fontSize: '24px', color: '#64748b' }}>
                Track Income
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>💰</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 40px',
                background: '#f8fafc',
                borderRadius: '16px',
              }}
            >
              <div style={{ fontSize: '24px', color: '#64748b' }}>
                Plan Expenses
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>📊</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px 40px',
                background: '#f8fafc',
                borderRadius: '16px',
              }}
            >
              <div style={{ fontSize: '24px', color: '#64748b' }}>
                Visualize Growth
              </div>
              <div style={{ fontSize: '48px', fontWeight: 'bold' }}>📈</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
