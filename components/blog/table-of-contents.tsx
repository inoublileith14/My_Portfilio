"use client"

export function TableOfContents({
  items,
}: {
  items: { id: string; title: string }[]
}) {
  return (
    <nav className="mb-12 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
      <h2 className="text-sm font-mono text-neon-magenta uppercase tracking-wider mb-4">
        Table of Contents
      </h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-neon-cyan transition-colors"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
