'use client'

import { Suspense } from 'react'
import Portfolio3D from '@/components/Portfolio3D'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Portfolio3D />
      </Suspense>
    </div>
  )
}
