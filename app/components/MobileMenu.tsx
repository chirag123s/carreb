
import Link from "next/link"
import { Menu, X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { auth0 } from "@/lib/auth0"

export async function MobileMenu() {
  const session = await auth0.getSession()
  const status = session ? "authenticated" : "unauthenticated";
  const isAuthenticated = status === "authenticated";

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
            <SheetClose asChild>
            </SheetClose>
          </div>
          <nav className="flex-grow overflow-y-auto">
            <div className="flex flex-col">
              <SheetClose asChild>
                <Link 
                  href="/"
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted"
                >
                  <span>Home</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  href="/car-search" 
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted"
                >
                  <span>Find Cars</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  href="/current-car" 
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted"
                >
                  <span>Current Car</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              
              <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                Resources
              </div>
              <SheetClose asChild>
                <Link 
                  href="/resources/guides" 
                  className="flex items-center justify-between px-6 py-2 hover:bg-muted"
                >
                  <span className="text-sm">Car Guides</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  href="/resources/comparison" 
                  className="flex items-center justify-between px-6 py-2 hover:bg-muted"
                >
                  <span className="text-sm">Compare Models</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link 
                  href="/resources/best-cars" 
                  className="flex items-center justify-between px-6 py-2 hover:bg-muted"
                >
                  <span className="text-sm">Best Cars</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </SheetClose>
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                // Logged-in user view
                <>
                  <div className="text-center py-2">
                    <span className="font-medium">
                      Welcome, {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <SheetClose asChild>
                    <a href="/auth/logout">
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      Log out
                    </Button>
                    </a>
                  </SheetClose>
                </>
              ) : (
                // Guest view
                <>
                  <SheetClose asChild>
                    <a href="/auth/login" className="w-full">
                      <Button variant="outline" className="w-full">Log in</Button>
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a href="/auth/register" className="w-full">
                      <Button className="w-full btn-dark-green">Sign up</Button>
                    </a>
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