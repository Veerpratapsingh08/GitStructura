import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const repo = searchParams.get('repo');

    if (!repo) {
      return new Response('Missing repo query parameter', { status: 400 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: '#0A0A0A',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            color: '#FAFAFA',
            position: 'relative',
          }}
        >
          {/* Subtle Grid Background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at center, #333 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              opacity: 0.5,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10,
              background: 'rgba(10, 10, 10, 0.8)',
              padding: '60px 80px',
              border: '1px solid #333',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  letterSpacing: '-0.05em',
                  color: '#FFFFFF',
                }}
              >
                CodeCity
              </div>
            </div>

            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '10px',
                textAlign: 'center',
                maxWidth: '900px',
              }}
            >
              {repo}
            </div>

            <div
              style={{
                fontSize: 24,
                color: '#A0A0A0',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '10px',
              }}
            >
              Interactive 3D Code Architecture
            </div>

            {/* Decorative blocky shapes to look like the Code City */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '60px', alignItems: 'flex-end' }}>
               <div style={{ width: 60, height: 120, border: '2px solid #555', background: '#111', borderRadius: '4px' }}></div>
               <div style={{ width: 80, height: 180, border: '2px solid #555', background: '#222', borderRadius: '4px' }}></div>
               <div style={{ width: 120, height: 260, border: '2px solid #FAFAFA', background: '#333', borderRadius: '4px' }}></div>
               <div style={{ width: 70, height: 140, border: '2px solid #555', background: '#222', borderRadius: '4px' }}></div>
               <div style={{ width: 90, height: 200, border: '2px solid #555', background: '#111', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
