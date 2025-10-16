import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Labs - Experimental Tools and Calculators';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
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
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '50px',
            padding: '12px 32px',
            marginBottom: '40px',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              marginRight: '12px',
            }}
          >
            🧪
          </span>
          <span
            style={{
              color: '#a78bfa',
              fontSize: '28px',
              fontWeight: '600',
            }}
          >
            Experimental Projects
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '96px',
              fontWeight: '900',
              background: 'linear-gradient(to right, #a78bfa, #8b5cf6, #7c3aed)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0',
              padding: '0',
              lineHeight: '1.1',
            }}
          >
            Labs & Tools
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '36px',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '40px 0 0 0',
            padding: '0 40px',
            lineHeight: '1.4',
          }}
        >
          Interactive calculators for financial planning and tax strategy
        </p>

        {/* Featured Tools */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '16px 32px',
            }}
          >
            <span style={{ fontSize: '28px', marginRight: '12px' }}>🧮</span>
            <span style={{ color: '#d4d4d8', fontSize: '24px', fontWeight: '500' }}>
              Tax Calculator
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '16px 32px',
            }}
          >
            <span style={{ fontSize: '28px', marginRight: '12px' }}>📈</span>
            <span style={{ color: '#d4d4d8', fontSize: '24px', fontWeight: '500' }}>
              Die With Zero
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#f4f4f5',
            }}
          >
            JP Narowski
          </span>
          <span
            style={{
              fontSize: '24px',
              color: '#71717a',
            }}
          >
            •
          </span>
          <span
            style={{
              fontSize: '24px',
              color: '#71717a',
            }}
          >
            jpnarowski.com/labs
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
