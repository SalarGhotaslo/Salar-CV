import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist_Mono } from "next/font/google";
import { LazyMotion, domAnimation } from "framer-motion";
import "./globals.css";
import Nav from "@/components/nav";
import ChatBot from "@/components/chatbot";
import { content } from "@/lib/content";

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
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
      className={`${headingFont.variable} ${bodyFont.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-fg">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LazyMotion features={domAnimation}>
          <Nav />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <ChatBot />
        </LazyMotion>
      </body>
    </html>
  );
}
