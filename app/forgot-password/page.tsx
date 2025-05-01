"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setIsLoading(true)
    console.log(values)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <main className="pt-6 pb-16 md:py-12">
      <div className="container px-4 sm:px-6">
        <div className="flex flex-col items-center max-w-sm sm:max-w-md mx-auto">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <Image 
                src="/images/carreb-logo-100.png" 
                alt="CarReb Logo" 
                width={120} 
                height={50} 
                className="h-12 w-auto mb-4"
              />
            </Link>
            <h1 className="text-2xl font-bold">Reset your password</h1>
          </div>
          
          <Card className="w-full border-0 sm:border shadow-none sm:shadow-sm">
            <CardHeader className="pb-4">
              <CardDescription>
                {!isSubmitted 
                  ? "Enter your email address and we'll send you a link to reset your password" 
                  : "Check your email for a reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      className="w-full btn-dark-green"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-700 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Check your email</h3>
                  <p className="mb-4 text-muted-foreground">We've sent a password reset link to your email address.</p>
                  <p className="text-sm text-muted-foreground">
                    Didn't receive an email? Check your spam folder or{" "}
                    <button 
                      onClick={() => setIsSubmitted(false)} 
                      className="text-green-700 hover:underline"
                    >
                      try again
                    </button>
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-0">
              <Link href="/login" className="text-green-700 hover:underline">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}