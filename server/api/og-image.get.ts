import { ImageResponse } from '@vercel/og'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string || 'example.com'
  const co2 = query.co2 as string || '0.5'
  const grade = query.grade as string || 'C'
  const isGreen = query.green === 'true'

  // Determine grade color
  const gradeColor = grade.startsWith('A') ? '#10b981' : grade === 'B' ? '#3b82f6' : '#f59e0b'
  const gradeLabel = grade.startsWith('A') ? 'Excellent' : grade === 'B' ? 'Good' : 'Needs Improvement'

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
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1e293b 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e293b 0%, transparent 50%)',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#10b981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C9.5 2 7.5 4 7.5 6.5C7.5 7.8 8.1 9 9 9.8L8 18L12 15L16 18L15 9.8C15.9 9 16.5 7.8 16.5 6.5C16.5 4 14.5 2 12 2Z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '28px',
              color: '#10b981',
              fontWeight: '700',
              letterSpacing: '-0.5px',
            }}
          >
            Web Carbon Calculator
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: '42px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center',
            maxWidth: '90%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {url}
        </div>

        {/* Stats Container */}
        <div
          style={{
            display: 'flex',
            gap: '30px',
            marginTop: '40px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {/* Grade */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '40px 60px',
              borderRadius: '24px',
              border: `3px solid ${gradeColor}`,
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: '900',
                color: gradeColor,
                lineHeight: 1,
                marginBottom: '12px',
              }}
            >
              {grade}
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600',
              }}
            >
              {gradeLabel}
            </div>
          </div>

          {/* CO2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '40px 60px',
              borderRadius: '24px',
              border: '3px solid rgba(255,255,255,0.2)',
            }}
          >
            <div
              style={{
                fontSize: '64px',
                fontWeight: '900',
                color: 'white',
                lineHeight: 1,
                marginBottom: '12px',
              }}
            >
              {co2}g
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600',
              }}
            >
              CO2 per visit
            </div>
          </div>

          {/* Green Hosting */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: isGreen ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '40px 60px',
              borderRadius: '24px',
              border: `3px solid ${isGreen ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '12px',
              }}
            >
              {isGreen ? '✓' : '✗'}
            </div>
            <div
              style={{
                fontSize: '20px',
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {isGreen ? 'Green' : 'Standard'}
              <br />
              Hosting
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
})
