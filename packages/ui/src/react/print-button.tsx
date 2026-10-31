'use client'

import { Printer } from 'lucide-react'
import { Button } from './button'

export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="ink" size="none" className="h-10 px-4 text-sm" onClick={() => window.print()}>
      <Printer className="size-icon-md" aria-hidden />
      {label}
    </Button>
  )
}
