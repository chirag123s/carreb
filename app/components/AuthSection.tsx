
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0"

export async function AuthSection() {
  const session = await auth0.getSession()
  const status = session ? "authenticated" : "unauthenticated";
  const isAuthenticated = status === "authenticated";

  return (
    <div className="flex items-center space-x-1 md:space-x-4">
      {isAuthenticated ? (
        // Logged in user view
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden sm:inline-block">
            Welcome, {session?.user?.name || session?.user?.email?.split('@')[0] || 'User'}
          </span>
          <a href="/auth/logout">
          <Button 
            size="sm" 
            variant="outline" 
            className="hidden sm:inline-flex"
          >
            Log out
          </Button>
          </a>
        </div>
      ) : (
        // Guest view
        <>
          <a href="/auth/login" className="text-sm font-medium hidden sm:inline-block hover:text-primary">
            Log in
          </a>
          <span className="hidden sm:inline-block text-muted-foreground">|</span>
          <a href="/auth/login?screen_hint=signup">
            <Button size="sm" className="hidden sm:inline-flex btn-dark-green">
              Sign up
            </Button>
          </a>
          <a href="auth/login" className="sm:hidden">
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </a>
        </>
      )}
    </div>
  );
}