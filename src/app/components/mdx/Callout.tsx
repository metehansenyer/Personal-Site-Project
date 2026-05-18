import type { ReactNode } from 'react'

interface CalloutProps {
  type: 'important' | 'warning' | 'note'
  children: ReactNode
}

const calloutConfig = {
  important: {
    label: 'ⓘ ÖNEMLİ',
    borderClass: 'border-[var(--important-color)]',
    textClass: 'text-[var(--important-color)]',
  },
  warning: {
    label: '⚠️ UYARI',
    borderClass: 'border-[var(--warning-color)]',
    textClass: 'text-[var(--warning-color)]',
  },
  note: {
    label: 'ⓘ NOT',
    borderClass: 'border-[var(--note-color)]',
    textClass: 'text-[var(--note-color)]',
  },
} as const

export default function Callout({ type, children }: CalloutProps) {
  const config = calloutConfig[type]

  return (
    <div className={`my-4 border-l-[6px] bg-transparent py-2 pr-2 pl-4 ${config.borderClass}`}>
      <p className={`mb-[5px] font-bold ${config.textClass}`}>{config.label}</p>
      <div>{children}</div>
    </div>
  )
}
