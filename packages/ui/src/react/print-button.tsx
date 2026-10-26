'use client'

import { Printer } from 'lucide-react'
import { Button } from './button'

export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="ink" size="none" className="h-10 px-4 text-md" onClick={() => window.print()}>
      <Printer size={15} strokeWidth={1.5} aria-hidden />
      {label}
    </Button>
  )
}
