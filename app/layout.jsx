import { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

import Breadcrumb from '@/src/container/Breadcrumb'
import Footer from '@/src/component/Footer'

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata = {
    title: 'Next.js learn',
    description: "learn how to use next.js",
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Breadcrumb />
                {children}
                <Footer />
            </body>
        </html>
    )
}
