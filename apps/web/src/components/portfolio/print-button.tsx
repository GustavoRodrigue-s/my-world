'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui'

export function PrintButton({ label }: { label: string }) {
  return (
    <Button variant="ink" size="none" className="h-10 px-4 text-[14px]" onClick={() => window.print()}>
      <Printer size={15} strokeWidth={1.5} aria-hidden />
      {label}
    </Button>
  )
}
