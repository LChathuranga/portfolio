import React from 'react'
import { cn } from '@/lib/utils'
import SidebarComp from '@components/SidebarComp'

export default function CreatePortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div
        className={cn(
          'rounded-md flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden'
        )}
      >
        <SidebarComp />
        {children}
      </div>
    </>
  )
}
