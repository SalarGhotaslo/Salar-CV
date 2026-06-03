import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ChatBot from "@/components/ChatBot";
import { content } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
  : new URL('http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: `${content.name} — ${content.role}`,
  description: content.bio[0],
  keywords: [
    'Front End Engineer',
    'Live Service Lead',
    'React',
    'TypeScript',
    'Next.js',
    'London',
    content.name,
  ],
  authors: [{ name: content.name, url: content.social.linkedin ?? undefined }],
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: content.name,
    title: `${content.name} — ${content.role}`,
    description: content.bio[0],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${content.name} — ${content.role}`,
    description: content.bio[0],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-fg">
        <Nav />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
