"use client"

import Image from "next/image"
import { TableOfContents } from "./table-of-contents"

export function RealtimeDashboardsContent() {
  return (
    <>
      <TableOfContents
        items={[
          { id: "introduction", title: "Introduction" },
          { id: "websocket-architecture", title: "WebSocket Architecture" },
          { id: "data-visualization", title: "Data Visualization Patterns" },
          { id: "performance", title: "Performance Optimization" },
          { id: "conclusion", title: "Conclusion" },
        ]}
      />

      <section id="introduction">
        <p className="text-lg leading-relaxed text-muted-foreground">
          Building real-time dashboards requires a careful balance of performance,
          reliability, and user experience. Modern web technologies like WebSockets,
          Server-Sent Events, and efficient state management make it possible to
          create dashboards that update instantly while remaining responsive.
        </p>
      </section>

      <section id="websocket-architecture" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          WebSocket Architecture for Real-Time Data
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          WebSockets provide full-duplex communication channels over a single TCP
          connection. This makes them ideal for dashboards that need to receive
          frequent updates without the overhead of repeated HTTP requests.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Key considerations when implementing WebSocket-based dashboards include
          connection management, reconnection strategies, and message queuing for
          handling temporary disconnections gracefully.
        </p>
      </section>

      <section id="data-visualization" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Data Visualization Patterns
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Effective real-time dashboards use visualization techniques that can
          handle streaming data without overwhelming users. Rolling windows,
          progressive disclosure, and smart aggregation help maintain clarity
          even with high-frequency updates.
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          <li><span className="text-neon-cyan">Rolling charts</span>: Display the last N data points, smoothly transitioning as new data arrives</li>
          <li><span className="text-neon-magenta">Heatmaps</span>: Show density and patterns over time windows</li>
          <li><span className="text-neon-purple">Sparklines</span>: Compact trend indicators for at-a-glance insights</li>
        </ul>
      </section>

      <section id="performance" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Performance Optimization
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          High-frequency updates can quickly degrade performance if not handled
          carefully. Techniques like requestAnimationFrame batching, virtual
          scrolling for large datasets, and efficient DOM updates are essential.
        </p>
        <blockquote className="border-l-4 border-neon-cyan pl-4 my-6 italic text-muted-foreground">
          {"\"The fastest code is code that doesn't run. Batch updates and minimize DOM operations for smooth real-time experiences.\""}
        </blockquote>
      </section>

      <section id="conclusion" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
        <p className="text-muted-foreground leading-relaxed">
          Real-time dashboards are becoming increasingly important in modern
          applications. By combining robust WebSocket architecture with efficient
          visualization patterns and performance optimizations, developers can
          create dashboards that provide instant insights without sacrificing
          user experience.
        </p>
      </section>
    </>
  )
}

export function NestJSMicroservicesContent() {
  return (
    <>
      <TableOfContents
        items={[
          { id: "introduction", title: "Introduction" },
          { id: "microservices-patterns", title: "Microservices Patterns" },
          { id: "communication", title: "Inter-Service Communication" },
          { id: "deployment", title: "Deployment Strategies" },
          { id: "conclusion", title: "Conclusion" },
        ]}
      />

      <section id="introduction">
        <p className="text-lg leading-relaxed text-muted-foreground">
          NestJS has emerged as one of the most popular frameworks for building
          scalable Node.js applications. Its modular architecture and built-in
          support for microservices make it an excellent choice for enterprise
          applications that need to scale horizontally.
        </p>
      </section>

      <section id="microservices-patterns" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Microservices Patterns in NestJS
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          NestJS provides first-class support for several microservices patterns
          including message-based communication, event-driven architecture, and
          request-response patterns. Each pattern has its use cases and trade-offs.
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          <li><span className="text-neon-cyan">CQRS</span>: Separate read and write operations for better scalability</li>
          <li><span className="text-neon-magenta">Event Sourcing</span>: Store events instead of state for complete audit trails</li>
          <li><span className="text-neon-purple">Saga Pattern</span>: Manage distributed transactions across services</li>
        </ul>
      </section>

      <section id="communication" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Inter-Service Communication
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          NestJS supports multiple transport layers for microservices communication
          including TCP, Redis, NATS, MQTT, RabbitMQ, and Kafka. Choosing the right
          transport depends on your requirements for reliability, performance, and
          message ordering.
        </p>
        <blockquote className="border-l-4 border-neon-magenta pl-4 my-6 italic text-muted-foreground">
          {"\"The choice of message broker is often less important than how you handle failures and retries in distributed systems.\""}
        </blockquote>
      </section>

      <section id="deployment" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Deployment Strategies
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Deploying microservices requires careful consideration of service
          discovery, load balancing, and health checks. Kubernetes has become
          the de facto standard for orchestrating microservices, and NestJS
          applications integrate well with Kubernetes patterns.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Key deployment considerations include:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          <li>Container orchestration with Kubernetes or Docker Swarm</li>
          <li>Service mesh integration with Istio or Linkerd</li>
          <li>Observability with distributed tracing and centralized logging</li>
          <li>CI/CD pipelines for automated testing and deployment</li>
        </ul>
      </section>

      <section id="conclusion" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
        <p className="text-muted-foreground leading-relaxed">
          NestJS provides a solid foundation for building microservices-based
          applications. By leveraging its built-in patterns and integrations,
          teams can focus on business logic rather than infrastructure concerns.
          The key is to start simple and add complexity only when needed.
        </p>
      </section>
    </>
  )
}
