import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider';
import { getSession, logout } from "../../auth";
import Navbar from '@/components/navbar/navbar';
import { PersistGate } from 'redux-persist/integration/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alphaherd',
  description: 'Vets solution',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
            <Navbar />
            {children}
          </StoreProvider>
        </body>
      </html>
    </>
  )
}