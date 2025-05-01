import Image from "next/image";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Inter } from 'next/font/google';
import Link from "next/link";
import { ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./components/MobileMenu";
import { AuthSection } from "./components/AuthSection";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarReb - Find Your Perfect Car Match",
  description: "Discover the ideal car for your needs with CarReb's intelligent matching system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu - Only visible on mobile */}
              <div className="lg:hidden flex items-center">
                <MobileMenu />
              </div>
              
              {/* Desktop Navigation - Hidden on mobile */}
              <nav className="hidden lg:flex items-center space-x-6">
                <Link 
                  href="/car-search" 
                  className="text-sm font-medium transition-colors  hover:text-teal-900"
                >
                  Find a car
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-sm font-medium transition-colors hover:text-teal-900">
                    Resources <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute left-0 top-full z-50 hidden group-hover:block w-max">
                    <div className="mt-2 rounded-md bg-card border shadow-md">
                      <div className="p-2">
                        <Link 
                          href="/resources/guides" 
                          className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                        >
                          Car Guides
                        </Link>
                        <Link 
                          href="/resources/comparison" 
                          className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                        >
                          Compare Models
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
              
              {/* Logo - Centered on mobile, left on desktop */}
              <div className="flex-1 flex justify-center lg:justify-start lg:flex-none">
                <Link href="/" className="flex items-center" title="Go to home page">
                  <Image
                    src="/images/carreb-logo-100.png"
                    alt="CarReb logo"
                    width={100}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                </Link>
              </div>
              
              {/* Auth buttons */}
              <div className="flex items-center space-x-1 md:space-x-4">
                <AuthSection />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="bg-gray-950 border-t">
          <div className="container px-4 md:px-6 py-8 md:py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2 space-y-4">
                <Link href="/">
                  <Image
                    src="/images/carreb-logo-white-100.png"
                    alt="CarReb logo"
                    width={100}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <p className="text-sm md:text-base font-medium">Save Costs. Save the Planet.</p>
                <p className="text-sm text-white max-w-md">
                  CarReb helps you find the perfect car match based on your needs, preferences, and environmental impact considerations.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Car Guides</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Comparison Tool</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Green Cars</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Best New Cars</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Car News</Link></li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="" className="text-sm text-white hover:text-foreground">About Us</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Privacy Policy</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Terms of Service</Link></li>
                  <li><Link href="" className="text-sm text-white hover:text-foreground">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-white">
                © {new Date().getFullYear()} Carreb, Inc. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Link href="" className="text-xs text-white hover:text-foreground">Privacy</Link>
                <Link href="" className="text-xs text-white hover:text-foreground">Terms</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
