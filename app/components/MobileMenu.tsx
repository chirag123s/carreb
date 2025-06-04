'use client';

import Link from "next/link"
import { Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { useAuth0 } from '@auth0/auth0-react'

export function MobileMenu() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4">
            <SheetTitle className="text-lg font-medium">Menu</SheetTitle>
          </div>
          <nav className="flex-grow overflow-y-auto">
            <div className="flex flex-col">
              <SheetClose asChild>
                <Link href="/" className="flex items-center justify-between px-4 py-3 hover:bg-muted">
                  <span>Home</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/car-search" className="flex items-center justify-between px-4 py-3 hover:bg-muted">
                  <span>Find Cars</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/current-car" className="flex items-center justify-between px-4 py-3 hover:bg-muted">
                  <span>Current Car</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              
              <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                Resources
              </div>
              <SheetClose asChild>
                <Link href="/resources/guides" className="flex items-center justify-between px-6 py-2 hover:bg-muted">
                  <span className="text-sm">Car Guides</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/resources/comparison" className="flex items-center justify-between px-6 py-2 hover:bg-muted">
                  <span className="text-sm">Compare Models</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex flex-col space-y-3">
              {!isLoading && isAuthenticated && user ? (
                // Logged-in user view
                <>
                  <div className="text-center py-2">
                    <span className="font-medium">
                      Welcome, {user.name || user.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <SheetClose asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => logout({ 
                        logoutParams: { 
                          returnTo: window.location.origin 
                        } 
                      })}
                    >
                      Log out
                    </Button>
                  </SheetClose>
                </>
              ) : (
                // Guest view
                <>
                  <SheetClose asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => loginWithRedirect()}
                    >
                      Log in
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button 
                      className="w-full btn-dark-green"
                      onClick={() => loginWithRedirect({
                        authorizationParams: {
                          screen_hint: 'signup'
                        }
                      })}
                    >
                      Sign up
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}