"use client"

import React from "react"
import Image from "next/image"
import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RealtimeDashboardsContent, NestJSMicroservicesContent } from "@/components/blog/realtime-dashboards-content"
import { TableOfContents } from "@/components/blog/table-of-contents"

interface BlogPostContentProps {
  slug: string
}

// Blog post content - In a production app, this would come from MDX files
const blogContent: Record<string, React.ReactNode> = {
  "healthcare-iot-synergy": <HealthcareIoTContent />,
  "state-management-patterns": <StateManagementContent />,
  "building-realtime-dashboards": <RealtimeDashboardsContent />,
  "nestjs-microservices-patterns": <NestJSMicroservicesContent />,
}

export function BlogPostContent({ slug }: BlogPostContentProps) {
  const content = blogContent[slug]

  if (!content) {
    return (
      <div className="prose prose-invert max-w-none">
        <p>Content not found.</p>
      </div>
    )
  }

  return <div className="prose prose-invert max-w-none">{content}</div>
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-3 z-10">
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-neon-cyan" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="text-xs text-muted-foreground absolute top-3 left-4">
        {language}
      </div>
      <pre className="bg-card/80 border border-border rounded-lg p-4 pt-10 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  )
}

function BlogImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50 shadow-lg">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function HealthcareIoTContent() {
  return (
    <>
      <TableOfContents
        items={[
          { id: "introduction", title: "Introduction" },
          { id: "reactive-to-proactive", title: "From Reactive to Proactive Healthcare" },
          { id: "technical-stack", title: "Technical Stack for HIPAA Compliance" },
          { id: "future-proofing", title: "Future-Proofing Mobility Apps" },
          { id: "conclusion", title: "Conclusion" },
        ]}
      />

      <section id="introduction">
        <p className="text-lg leading-relaxed text-muted-foreground">
          The convergence of Artificial Intelligence and the Internet of Things is reshaping 
          healthcare delivery in ways we could only imagine a decade ago. Edge computing, 
          in particular, is emerging as a critical enabler for real-time patient monitoring 
          and predictive diagnostics.
        </p>
      </section>

      <section id="reactive-to-proactive" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          From Reactive to Proactive Healthcare
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Traditional healthcare has always been reactive: patients experience symptoms, 
          seek care, and receive treatment. The IoT revolution is fundamentally changing 
          this paradigm by enabling continuous monitoring and predictive interventions.
        </p>
        
        <BlogImage 
          src="/images/blog/wearable-devices.jpg" 
          alt="Modern medical wearable devices for health monitoring"
          caption="Wearable devices enable continuous health monitoring and early detection of anomalies"
        />
        
        <p className="text-muted-foreground leading-relaxed mb-4">
          Wearable devices now capture vital signs around the clock, transmitting data 
          to cloud platforms where AI algorithms analyze patterns and detect anomalies 
          before they become critical. This shift from reactive to proactive care has 
          the potential to save countless lives.
        </p>
        <blockquote className="border-l-4 border-neon-cyan pl-4 my-6 italic text-muted-foreground">
          {"\"The best treatment is prevention. IoT gives us the eyes to see problems before they manifest.\""}
        </blockquote>
      </section>

      <section id="technical-stack" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Technical Stack for HIPAA-Compliant IoT Data Pipelines
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Building healthcare IoT solutions requires careful attention to security and 
          compliance. Here is a reference architecture for a HIPAA-compliant data pipeline:
        </p>

        <BlogImage 
          src="/images/blog/iot-architecture-diagram.jpg" 
          alt="IoT healthcare architecture diagram showing data flow from edge devices to cloud"
          caption="HIPAA-compliant IoT architecture: Edge encryption, secure transport, and audit logging"
        />

        <CodeBlock
          language="typescript"
          code={`// Edge Device Data Handler
interface VitalSigns {
  heartRate: number;
  bloodPressure: { systolic: number; diastolic: number };
  oxygenSaturation: number;
  temperature: number;
  timestamp: Date;
}

async function processVitalSigns(data: VitalSigns) {
  // Encrypt at the edge before transmission
  const encrypted = await encryptWithAES256(data);
  
  // Send to secure MQTT broker
  await mqttClient.publish('vitals/patient/{id}', encrypted, {
    qos: 2, // Exactly once delivery
    retain: false,
  });
}`}
        />

        <p className="text-muted-foreground leading-relaxed mb-4">
          Key components of this architecture include:
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          <li><span className="text-neon-cyan">Edge encryption</span>: All data encrypted before leaving the device</li>
          <li><span className="text-neon-magenta">Secure transport</span>: TLS 1.3 for all communications</li>
          <li><span className="text-neon-purple">Audit logging</span>: Complete trail of all data access</li>
          <li><span className="text-neon-red">Access controls</span>: Role-based permissions at every layer</li>
        </ul>
      </section>

      <section id="future-proofing" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Future-Proofing Mobility Apps in the Medical Space
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Mobile applications in healthcare must be built with longevity in mind. 
          Regulatory requirements evolve, device capabilities expand, and user 
          expectations grow. A robust architecture using cross-platform frameworks 
          like Flutter enables rapid iteration while maintaining a single codebase.
        </p>

        <CodeBlock
          language="dart"
          code={`// Flutter health data provider with offline support
class HealthDataProvider extends ChangeNotifier {
  final LocalStorage _storage;
  final SecureApi _api;
  
  Future<void> syncVitals() async {
    final pendingData = await _storage.getPendingUploads();
    
    for (final record in pendingData) {
      try {
        await _api.uploadVitals(record);
        await _storage.markAsSynced(record.id);
      } catch (e) {
        // Retry on next sync cycle
        await _storage.incrementRetryCount(record.id);
      }
    }
    notifyListeners();
  }
}`}
        />
      </section>

      <section id="conclusion" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
        <p className="text-muted-foreground leading-relaxed">
          The synergy between AI and IoT in healthcare represents one of the most 
          promising technological convergences of our time. By building secure, 
          compliant, and future-proof systems, we can unlock the full potential 
          of connected health devices and AI-driven insights to improve patient 
          outcomes worldwide.
        </p>
      </section>
    </>
  )
}

function StateManagementContent() {
  return (
    <>
      <TableOfContents
        items={[
          { id: "intro", title: "Introduction" },
          { id: "beyond-usecontext", title: "Why useContext Isn't Always Enough" },
          { id: "zustand-vs-xstate", title: "Zustand vs XState" },
          { id: "benchmarks", title: "Performance Benchmarks" },
          { id: "conclusion", title: "Conclusion" },
        ]}
      />

      <section id="intro">
        <p className="text-lg leading-relaxed text-muted-foreground">
          State management remains one of the most debated topics in the React ecosystem. 
          In 2026, we have more options than ever, but the choice between libraries like 
          Zustand and XState often comes down to one fundamental question: how complex 
          are your application's state transitions?
        </p>
      </section>

      <section id="beyond-usecontext" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Why useContext Is Not Always Enough for Enterprise SaaS
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          React's built-in Context API is powerful for simple state sharing, but it 
          has significant limitations when building enterprise-scale applications:
        </p>
        
        <BlogImage 
          src="/images/blog/state-flow-diagram.jpg" 
          alt="State management flow diagram showing component relationships"
          caption="Complex state flows require dedicated management solutions beyond React Context"
        />
        
        <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
          <li>Every context update triggers re-renders in all consuming components</li>
          <li>No built-in support for middleware, persistence, or devtools</li>
          <li>Complex state logic gets scattered across multiple contexts</li>
          <li>Difficult to test state transitions in isolation</li>
        </ul>
        <blockquote className="border-l-4 border-neon-magenta pl-4 my-6 italic text-muted-foreground">
          {"\"The right tool for the job matters more than the most popular tool in the community.\""}
        </blockquote>
      </section>

      <section id="zustand-vs-xstate" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Zustand for Simplicity vs XState for Complex Workflows
        </h2>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
          Zustand: The Minimalist Approach
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Zustand shines when you need simple, performant state management without 
          the ceremony of Redux or the complexity of finite state machines.
        </p>

        <CodeBlock
          language="typescript"
          code={`// Zustand store for user preferences
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  setTheme: (theme: PreferencesState['theme']) => void;
  setLanguage: (lang: string) => void;
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'en',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'user-preferences' }
  )
);`}
        />

        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
          XState: When State Machines Make Sense
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          XState becomes invaluable when your application has complex, multi-step 
          workflows with strict transition rules, like checkout flows or document 
          approval processes.
        </p>

        <CodeBlock
          language="typescript"
          code={`// XState machine for document approval workflow
import { createMachine, assign } from 'xstate';

const approvalMachine = createMachine({
  id: 'documentApproval',
  initial: 'draft',
  context: { reviewers: [], approvals: 0 },
  states: {
    draft: {
      on: { SUBMIT: 'pendingReview' }
    },
    pendingReview: {
      on: {
        APPROVE: {
          target: 'approved',
          guard: 'hasAllApprovals'
        },
        REQUEST_CHANGES: 'draft',
        REJECT: 'rejected'
      }
    },
    approved: { type: 'final' },
    rejected: { type: 'final' }
  }
});`}
        />
      </section>

      <section id="benchmarks" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Performance Benchmarks for High-Frequency Updates
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          When dealing with real-time data updates (like stock tickers or live 
          dashboards), the choice of state management can significantly impact 
          performance. Here are benchmark results for 1000 updates per second:
        </p>
        
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-foreground">Library</th>
                <th className="text-left py-3 px-4 text-foreground">Avg Render Time</th>
                <th className="text-left py-3 px-4 text-foreground">Memory Usage</th>
                <th className="text-left py-3 px-4 text-foreground">Bundle Size</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-neon-cyan">Zustand</td>
                <td className="py-3 px-4 text-muted-foreground">0.8ms</td>
                <td className="py-3 px-4 text-muted-foreground">12MB</td>
                <td className="py-3 px-4 text-muted-foreground">1.1KB</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-neon-magenta">XState</td>
                <td className="py-3 px-4 text-muted-foreground">1.2ms</td>
                <td className="py-3 px-4 text-muted-foreground">15MB</td>
                <td className="py-3 px-4 text-muted-foreground">14KB</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 text-neon-purple">Redux Toolkit</td>
                <td className="py-3 px-4 text-muted-foreground">1.5ms</td>
                <td className="py-3 px-4 text-muted-foreground">18MB</td>
                <td className="py-3 px-4 text-muted-foreground">11KB</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="conclusion" className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Conclusion</h2>
        <p className="text-muted-foreground leading-relaxed">
          There is no universal best choice for state management. Zustand excels 
          for straightforward state needs with minimal overhead, while XState 
          provides unmatched clarity for complex, logic-heavy workflows. The key 
          is understanding your application's specific requirements and choosing 
          the tool that best fits those needs.
        </p>
      </section>
    </>
  )
}
