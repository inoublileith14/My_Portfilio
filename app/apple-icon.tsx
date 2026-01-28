import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '37px',
          border: '3px solid #fa1e4e',
        }}
      >
        <div
          style={{
            color: '#fa1e4e',
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}
        >
          L
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
