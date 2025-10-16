import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'Financial Tax Burden Calculator - Model Phantom Equity & Tax Strategies';
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
            🧮
          </span>
          <span
            style={{
              color: '#a78bfa',
              fontSize: '28px',
              fontWeight: '600',
            }}
          >
            Tax Strategy Calculator
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
              fontSize: '80px',
              fontWeight: '900',
              background: 'linear-gradient(to right, #a78bfa, #8b5cf6, #7c3aed)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0',
              padding: '0',
              lineHeight: '1.1',
            }}
          >
            Financial Tax Burden
          </h1>
          <h1
            style={{
              fontSize: '80px',
              fontWeight: '900',
              background: 'linear-gradient(to right, #7c3aed, #8b5cf6, #a78bfa)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '20px 0 0 0',
              padding: '0',
              lineHeight: '1.1',
            }}
          >
            Calculator
          </h1>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '32px',
            color: '#a1a1aa',
            textAlign: 'center',
            maxWidth: '900px',
            margin: '40px 0 0 0',
            padding: '0 40px',
            lineHeight: '1.4',
          }}
        >
          Model tax strategies for phantom equity and large income events
        </p>

        {/* Feature Pills */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '50px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '12px 24px',
            }}
          >
            <span style={{ color: '#d4d4d8', fontSize: '20px', fontWeight: '500' }}>
              💼 Business Losses
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '12px 24px',
            }}
          >
            <span style={{ color: '#d4d4d8', fontSize: '20px', fontWeight: '500' }}>
              🏠 REP Status
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '12px 24px',
            }}
          >
            <span style={{ color: '#d4d4d8', fontSize: '20px', fontWeight: '500' }}>
              🛢️ Oil & Gas
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
            jpnarowski.com/tools/tax-calculator
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
