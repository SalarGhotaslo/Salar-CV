import { ImageResponse } from 'next/og'
import { content } from '@/lib/content'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0a0f',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow — top right */}
        <div
          style={{
            position: 'absolute',
            right: '-120px',
            top: '-120px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,106,255,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Cyan glow — bottom left */}
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            bottom: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 90px',
            flex: 1,
          }}
        >
          {/* Location pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                color: '#6b6b80',
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              {content.location}
            </div>
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#e8e8f0',
              lineHeight: 1.05,
              marginBottom: '24px',
              letterSpacing: '-1px',
            }}
          >
            {content.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: '26px',
              color: '#7c6aff',
              letterSpacing: '0.5px',
            }}
          >
            {content.role}
          </div>

          {/* Divider + tag line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '48px',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '2px',
                background: '#7c6aff',
                borderRadius: '2px',
              }}
            />
            <div style={{ fontSize: '18px', color: '#6b6b80' }}>
              Personal site · AI chatbot included
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
