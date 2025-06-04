'use client';

import Link from "next/link";
import { User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthSection() {
  const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();
  const router = useRouter();

  // Check email verification status
  useEffect(() => {
    if (isAuthenticated && user && !user.email_verified) {
      // Redirect to email verification page if email is not verified
      router.push('/verify-email');
    }
  }, [isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-1 md:space-x-4">
        <div className="w-16 h-8 bg-muted animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-1 md:space-x-4">
      {isAuthenticated && user ? (
        <div className="flex items-center gap-2">
          {/* Show warning if email is not verified */}
          {!user.email_verified && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertCircle 
                  onClick={() => router.push('/verify-email')}
                  className="h-4 w-4 text-amber-500 cursor-pointer hover:text-amber-600 transition-colors"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Verify your email</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          <span className="text-sm font-medium hidden sm:inline-block">
            Welcome, {user.name || user.email?.split('@')[0] || 'User'}
          </span>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="hidden sm:inline-flex"
            onClick={() => logout({ 
              logoutParams: { 
                returnTo: window.location.origin 
              } 
            })}
          >
            Log out
          </Button>
        </div>
      ) : (
        // Guest view (existing code)
        <>
          <button 
            onClick={() => loginWithRedirect()}
            className="text-sm font-medium hidden sm:inline-block hover:text-primary"
          >
            Log in
          </button>
          <span className="hidden sm:inline-block text-muted-foreground">|</span>
          <Button 
            size="sm" 
            className="hidden sm:inline-flex btn-dark-green"
            onClick={() => loginWithRedirect({
              authorizationParams: {
                screen_hint: 'signup'
              }
            })}
          >
            Sign up
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Account"
            className="sm:hidden"
            onClick={() => loginWithRedirect()}
          >
            <User className="h-5 w-5" />
          </Button>
        </>
      )}
    </div>
  );
}