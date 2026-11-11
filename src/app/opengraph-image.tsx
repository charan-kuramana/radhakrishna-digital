import { ImageResponse } from 'next/og';

// 1200x630 share preview for LinkedIn, Facebook and WhatsApp. Generated at build time.
export const dynamic = 'force-static';
export const alt = 'Radhakrishna Digital — brand, websites, apps, hosting and AI, end to end. Vijayawada, India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          color: '#F4F7FB',
          background: 'radial-gradient(circle at 85% 20%, #1f5b8c 0%, transparent 45%), radial-gradient(circle at 90% 95%, #5b3e9c 0%, transparent 40%), #050A14',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0b3a7a',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            RD
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Radhakrishna Digital</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 960 }}>
            Websites and booking systems that help small businesses get more enquiries.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: '#22D3EE' }}>Vijayawada, India • Since February 2024</div>
        </div>
      </div>
    ),
    size,
  );
}
