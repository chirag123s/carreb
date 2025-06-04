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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
/*import { SocialLogin } from "../components/SocialLogin"*/
import { Auth0Client } from "@auth0/nextjs-auth0/server"

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
})

const auth0 = new Auth0Client({
  domain: 'dev-w44f8loqfmt8l6ga.us.auth0.com',
  clientId: '0eotoOen82ceMQJtprftOy94QUO2R8pE',
  clientSecret: 'E3TWzLY0wEcNhVlkMWVcwXeLOLD75hPNUdXLt1Vnl6NLh_7jC514fFnwWbAfth26',
  appBaseUrl: 'http://localhost:3000',
  secret: '6f7720ecb9a834a9a30fde64aab6e0168b39595662b617180f02be847bc17849',
//   authorizationParameters: {
//     // In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables are no longer automatically picked up by the SDK.
//     // Instead, we need to provide the values explicitly.
//     scope: process.env.AUTH0_SCOPE,
//     audience: process.env.AUTH0_AUDIENCE,
//   }
});

function startlogin() {
  auth0.startInteractiveLogin({
    returnTo: "/",
    // Optional scopes
  }).then(response => {
    console.log(response);
    // Handle the response, including the access token and ID toke
  }).catch(error => {
    console.error(error);
    // Handle any errors
  });
    
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)
    console.log(values)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
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
            <h1 className="text-2xl font-bold">Log in to your account</h1>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-sm sm:text-base">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-sm sm:text-base">
                <Link href="/register" className="w-full h-full flex items-center justify-center">
                  Register
                </Link>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="w-full">
              <Card className="border-0 sm:border shadow-none sm:shadow-sm">
                <CardHeader className="pb-4">
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300"
                                checked={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-sm">Remember me</FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <Button
                        className="w-full btn-dark-green"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Log in"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 pt-0 pb-2">
                  <div className="text-sm text-center w-full">
                    <Link href="/forgot-password" className="text-green-700 hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                  
                  {/*<SocialLogin />*/}
                  <button onClick={() => startlogin()}>Google</button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <p className="text-sm text-muted-foreground mt-8 text-center">
            By continuing, you agree to CarReb's{" "}
            <Link href="/terms" className="text-green-700 hover:underline">Terms of Service</Link> and{" "}
            <Link href="/privacy" className="text-green-700 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  )
}