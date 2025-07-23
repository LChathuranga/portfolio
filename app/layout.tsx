import React from 'react'
import './globals.css'

export const metadata = {
  title: '3D Interactive Portfolio',
  description: 'An immersive 3D portfolio experience built with Three.js and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
