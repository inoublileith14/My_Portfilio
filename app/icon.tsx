import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#0d0d0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          border: '2px solid #fa1e4e',
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
