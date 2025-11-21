import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { analyzeWebsite } from '../utils/analyzeWebsite'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  // Load Inter font from server assets (works on Vercel)
  const fontData = await useStorage('assets:server').getItemRaw('fonts/Inter-Regular.ttf')

  // Get URL from query parameter
  const urlParam = query.url as string || null

  // Analyze website if URL is provided
  let analysisData: { url: string; co2: string; grade: string; isGreen: boolean } | null = null

  if (urlParam) {
    try {
      // Get the origin URL dynamically
      const requestURL = getRequestURL(event)
      const origin = requestURL.origin

      const result = await analyzeWebsite(urlParam, origin)
      analysisData = {
        url: result.url,
        co2: result.co2_grams.toString(),
        grade: result.grade,
        isGreen: result.is_green
      }
    } catch (error) {
      // If analysis fails, don't show data (fall back to general image)
      console.error('OG Image analysis error:', error)
    }
  }

  // Use analyzed data or null
  const url = analysisData?.url || null
  const co2 = analysisData?.co2 || null
  const grade = analysisData?.grade || null
  const isGreen = analysisData?.isGreen || false

  // Farbe basierend auf Grade
  const getGradeColor = (g: string | null) => {
    if (!g) return '#10b981'
    if (g.startsWith('A')) return '#10b981'
    if (g === 'B') return '#3b82f6'
    if (g === 'C') return '#f59e0b'
    return '#ef4444'
  }

  const gradeColor = getGradeColor(grade)

  // Generiere SVG mit satori
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(30, 41, 59, 0.5) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(30, 41, 59, 0.5) 0%, transparent 50%)',
          fontFamily: 'Inter',
          padding: '60px',
        },
        children: [
          // Header mit Logo
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: url ? '40px' : '60px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '32px',
                      color: '#10b981',
                      fontWeight: '700',
                      letterSpacing: '-0.5px',
                    },
                    children: 'Web Carbon Calculator',
                  },
                },
              ],
            },
          },

          // Wenn URL vorhanden: Zeige Analyse-Daten
          ...(url ? [
            // Website URL
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '48px',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '40px',
                  textAlign: 'center',
                  maxWidth: '90%',
                },
                children: url,
              },
            },

            // Stats Container
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  gap: '32px',
                  width: '100%',
                  justifyContent: 'center',
                },
                children: [
                  // Grade Card
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '48px',
                        borderRadius: '24px',
                        border: `4px solid ${gradeColor}`,
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '96px',
                              fontWeight: '900',
                              color: gradeColor,
                              lineHeight: '1',
                              marginBottom: '16px',
                            },
                            children: grade || 'A+',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '20px',
                              color: 'rgba(255,255,255,0.8)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontWeight: '600',
                            },
                            children: 'ECO GRADE',
                          },
                        },
                      ],
                    },
                  },

                  // CO2 Card
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '48px',
                        borderRadius: '24px',
                        border: '4px solid rgba(255,255,255,0.2)',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '72px',
                              fontWeight: '900',
                              color: 'white',
                              lineHeight: '1',
                              marginBottom: '16px',
                            },
                            children: `${co2 || '0.5'}g`,
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '20px',
                              color: 'rgba(255,255,255,0.8)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontWeight: '600',
                            },
                            children: 'CO2 PER VISIT',
                          },
                        },
                      ],
                    },
                  },

                  // Green Hosting
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: isGreen ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)',
                        padding: '48px',
                        borderRadius: '24px',
                        border: `4px solid ${isGreen ? '#10b981' : 'rgba(255,255,255,0.2)'}`,
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '64px',
                              marginBottom: '16px',
                              color: 'white',
                            },
                            children: isGreen ? '✓' : '✗',
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '20px',
                              color: 'rgba(255,255,255,0.8)',
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              fontWeight: '600',
                              textAlign: 'center',
                            },
                            children: isGreen ? 'GREEN HOSTING' : 'STANDARD HOSTING',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ] : [
            // Kein URL: Zeige allgemeine Info
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '64px',
                  fontWeight: '700',
                  color: 'white',
                  textAlign: 'center',
                  marginBottom: '24px',
                  lineHeight: '1.2',
                },
                children: 'How green is your website?',
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  fontSize: '28px',
                  color: 'rgba(255,255,255,0.8)',
                  textAlign: 'center',
                  maxWidth: '800px',
                  lineHeight: '1.4',
                },
                children: 'Calculate the carbon footprint of your web pages and get actionable recommendations.',
              },
            },
          ]),
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  )

  // Konvertiere SVG zu PNG
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  // Setze Response Headers
  setHeader(event, 'Content-Type', 'image/png')
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return pngBuffer
})
