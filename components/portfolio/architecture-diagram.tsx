"use client"

import { motion } from "framer-motion"

interface DiagramProps {
  type: "hit-alerts" | "yup-mobility"
  color: string
}

export function ArchitectureDiagram({ type, color }: DiagramProps) {
  if (type === "hit-alerts") {
    return <HITAlertsDiagram color={color} />
  }
  return <YUPMobilityDiagram color={color} />
}

function HITAlertsDiagram({ color }: { color: string }) {
  return (
    <div className="w-full p-6 bg-background/50 rounded-xl border" style={{ borderColor: `${color}30` }}>
      <motion.svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Camera */}
        <g>
          <rect x="50" y="150" width="80" height="100" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="90" y="205" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">RTSP Camera</text>
          <path d="M 130 200 L 200 200" stroke={color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Nginx */}
        <g>
          <rect x="220" y="120" width="100" height="160" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="270" y="145" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Nginx</text>
          <text x="270" y="165" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Reverse Proxy</text>
          <text x="270" y="180" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">SSL Termination</text>
          <text x="270" y="195" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Load Balancing</text>
          <path d="M 320 200 L 380 200" stroke={color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Frontend Container */}
        <g>
          <rect x="400" y="50" width="120" height="100" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="460" y="75" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Frontend</text>
          <text x="460" y="95" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Next.js</text>
          <text x="460" y="110" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">HLS.js</text>
          <text x="460" y="125" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Docker</text>
          <path d="M 400 100 L 350 200" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
        </g>

        {/* Backend Container */}
        <g>
          <rect x="400" y="250" width="120" height="100" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="460" y="275" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Backend</text>
          <text x="460" y="295" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">NestJS</text>
          <text x="460" y="310" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">ML Inference</text>
          <text x="460" y="325" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Docker</text>
          <path d="M 400 300 L 350 200" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
        </g>

        {/* PostgreSQL */}
        <g>
          <rect x="550" y="200" width="100" height="100" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="600" y="225" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">PostgreSQL</text>
          <text x="600" y="245" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">TimescaleDB</text>
          <text x="600" y="260" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Hypertables</text>
          <path d="M 520 250 L 550 250" stroke={color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* HLS Stream Flow */}
        <path
          d="M 50 200 Q 100 100, 200 200 T 350 200"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          opacity="0.6"
        />
        <text x="200" y="90" textAnchor="middle" fill={color} fontSize="12" opacity="0.8">HLS Stream</text>

        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill={color} />
          </marker>
        </defs>
      </motion.svg>
    </div>
  )
}

function YUPMobilityDiagram({ color }: { color: string }) {
  return (
    <div className="w-full p-6 bg-background/50 rounded-xl border" style={{ borderColor: `${color}30` }}>
      <motion.svg
        viewBox="0 0 800 350"
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* User */}
        <g>
          <circle cx="80" cy="175" r="30" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="80" y="180" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">User</text>
          <path d="M 110 175 L 180 175" stroke={color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Next.js Middleware */}
        <g>
          <rect x="200" y="100" width="140" height="150" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="270" y="125" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Next.js</text>
          <text x="270" y="145" textAnchor="middle" fill={color} fontSize="12" fontWeight="600">Middleware</text>
          <line x1="270" y1="155" x2="270" y2="230" stroke={color} strokeWidth="1" opacity="0.5" />
          <text x="270" y="170" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Tenant ID</text>
          <text x="270" y="185" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Injection</text>
          <text x="270" y="200" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Auth Check</text>
          <text x="270" y="215" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Data Isolation</text>
          <path d="M 340 175 L 400 175" stroke={color} strokeWidth="2" markerEnd="url(#arrowhead)" />
        </g>

        {/* Firebase Realtime DB */}
        <g>
          <rect x="420" y="50" width="120" height="250" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="480" y="75" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Firebase</text>
          <text x="480" y="95" textAnchor="middle" fill={color} fontSize="12" fontWeight="600">Realtime DB</text>
          <line x1="480" y1="105" x2="480" y2="280" stroke={color} strokeWidth="1" opacity="0.5" />
          
          {/* Tenant Collections */}
          <rect x="430" y="115" width="100" height="30" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
          <text x="480" y="135" textAnchor="middle" fill={color} fontSize="10" fontWeight="600">tenants/tenant1/</text>
          
          <rect x="430" y="155" width="100" height="30" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
          <text x="480" y="175" textAnchor="middle" fill={color} fontSize="10" fontWeight="600">tenants/tenant2/</text>
          
          <rect x="430" y="195" width="100" height="30" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
          <text x="480" y="215" textAnchor="middle" fill={color} fontSize="10" fontWeight="600">tenants/tenant3/</text>
          
          <text x="480" y="250" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Complete</text>
          <text x="480" y="265" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Isolation</text>
        </g>

        {/* Google Maps */}
        <g>
          <rect x="570" y="50" width="100" height="100" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="620" y="75" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Google</text>
          <text x="620" y="95" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">Maps</text>
          <text x="620" y="115" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Clustering</text>
          <text x="620" y="130" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">SWR Cache</text>
          <path d="M 540 175 L 570 100" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
        </g>

        {/* WebSocket Manager */}
        <g>
          <rect x="570" y="200" width="100" height="100" rx="8" fill={color} opacity="0.2" stroke={color} strokeWidth="2" />
          <text x="620" y="225" textAnchor="middle" fill={color} fontSize="14" fontWeight="600">WebSocket</text>
          <text x="620" y="245" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Connection</text>
          <text x="620" y="260" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">Pooling</text>
          <text x="620" y="275" textAnchor="middle" fill={color} fontSize="11" opacity="0.8">5K+ Streams</text>
          <path d="M 540 175 L 570 250" stroke={color} strokeWidth="2" strokeDasharray="4,4" />
        </g>

        {/* Data Flow Labels */}
        <text x="270" y="90" textAnchor="middle" fill={color} fontSize="12" opacity="0.8">Request</text>
        <text x="270" y="260" textAnchor="middle" fill={color} fontSize="12" opacity="0.8">Tenant Context</text>

        {/* Arrow marker */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill={color} />
          </marker>
        </defs>
      </motion.svg>
    </div>
  )
}
