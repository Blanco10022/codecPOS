import '@/styles/globals.css'
import localFont from 'next/font/local'
import { AuthLayout } from '@/components/Shared/Layout/AuthLayout'

// Correctly load the local font
const myriadPro = localFont({
  src: '../fonts/MyriadPro-Regular.ttf',
  variable: '--font-myriad-pro',
  display: 'swap',
})

// Metadata configuration
export const metadata = {
  title: 'NanoTrade',
  description: 'Manage your sales and inventory with ease',
}

// Root layout component with proper TypeScript interface
interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${myriadPro.variable} font-sans antialiased`}>
        <AuthLayout>
          {children}
        </AuthLayout>
      </body>
    </html>
  )
}
