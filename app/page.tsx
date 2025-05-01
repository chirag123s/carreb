'use client'; // Add this for client components in Next.js 13+

import React from 'react';
import { useState } from "react"
import Image from 'next/image';
import Link from 'next/link'; // Next.js Link component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function HomePage() {

  const [isShowNotificationBar, setShowNotificationBar] = useState(false)
  const isShowPricingPlans = false
  const isShowStats = false
  const isShowHowItWorks = false

  return (
    <main className="min-h-screen flex flex-col">
      {isShowNotificationBar && (
      <div className="w-full bg-zinc-800 text-white py-1 px-4 text-center text-xs sm:text-sm">
          Notifications for discounts and other things can be shown here
      </div>
      )}

      {/* Hero Section */}
      <section className="bg-slate-100 min-h-[350px]">
        <div className="container mx-auto px-4 sm:px-6 lg:grid grid-cols-1 md:grid-cols-2 py-8 md:py-10 homepage-banner">
          <div className="md:flex items-center justify-center col-l">
            <div className="w-full relative rounded-lg">
              <h1 >The Sustainable Way to Your Next Car</h1>
              <p className="text-2xl mt-6">Discover how you can minimize your environmental impact without sacrificing performance or affordability</p>
              <div className="">
                <Button asChild className="btn-dark-green mt-6 text-xl pt-6 pb-6 min-w-64">
                  <Link href="/car-search">Find a car</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:flex md:flex flex-col items-center justify-center space-y-4 md:space-y-6 lg:p-4 md:p-4 sm:p-8 col-r">
            <h3 className="uppercase text-center font-medium max-w-60-pcnt">The biggest car buying mistake</h3>
            <Image
              src="/images/header-cars.png"
              alt="Cars"
              width={200}
              height={200}
              className="w-auto w-full"
              priority
            />
            <h3 className="text-thin">Ignoring Total <span className="carreb-green">Cost of Ownership</span></h3>
            <p>Many buyers focus only on the price or monthly payment, ignoring the total cost of ownership &mdash; insurance, maintenance, fuel, and depreciation.  A cheaper car upfront can cost more long-term.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center">Discover the Smarter Way to Choose Your Car</h2>
          <p className="text-center max-w-40-pcnt m-auto mt-4 mb-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc odio in et, lectus sit lorem id integer.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 md:gap-6 boxes-discover mt-12">
            
            <div className="bg-slate-100 p-4 sm:p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 transform">
              <h3 className="font-bold mb-2 text-base sm:text-lg text-2xl">Compare Costs & Savings</h3>
              <div className="grid grid-cols-2 mt-8 gap-4">
                <p>Unlock transparent insights into the total cost of ownership, including fuel, maintenance, and potential savings compared to other models</p>
                <Image
                  src="/images/green-finance-1.png"
                  alt="Cars"
                  width={200}
                  height={200}
                  className="w-auto w-full"
                  priority
                />
              </div>
            </div>
            
            <div className="bg-slate-100 p-4 sm:p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 transform">
              <h3 className="font-bold mb-2 text-base sm:text-lg text-2xl max-w-60-pcnt">Understand Your Environmental Impact</h3>
              <div className="grid grid-cols-2 mt-8 gap-4 ">
                <p>Easily compare CO2 emissions and environmental ratings to make a choice that aligns with your sustainability goals.</p>
                <Image
                  src="/images/green-C02-1.png"
                  alt="Cars"
                  width={200}
                  height={200}
                  className="w-auto w-full"
                  priority
                />
              </div>
            </div>
            
            <div className="bg-slate-100 p-4 sm:p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 transform">
              <h3 className="font-bold mb-2 text-base sm:text-lg text-2xl max-w-60-pcnt">Explore Smart Recommendations</h3>
              <div className="grid grid-cols-2 mt-8 gap-4 ">
                <p>Our AI-powered Smart Car Finder analyzes your needs and preferences to suggest the best vehicles for your lifestyle and budget.</p>
                <Image
                  src="/images/electronics-1.png"
                  alt="Cars"
                  width={200}
                  height={200}
                  className="w-auto w-full"
                  priority
                />
              </div>
            </div>
            
            <div className="bg-slate-100 p-4 sm:p-6 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 transform">
              <h3 className="font-bold mb-2 text-base sm:text-lg text-2xl">See the Clear CARS Rating</h3>
              <div className="grid grid-cols-2 mt-8 gap-4 ">
                <p>Our unique CARS rating system simplifies complex data, giving you an easy-to-understand score for cost of ownership and environmental impact.</p>
                <Image
                  src="/images/car-parts-1.png"
                  alt="Cars"
                  width={200}
                  height={200}
                  className="w-auto w-full"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:grid md:grid grid-cols-2 gap-x-40">
          <div>
            <h2 className="text-4xl lg:text-5xl font-extrabold leading-snug">Your Trusted Partner for Smarter Car Choices</h2>
            <p className="mt-10">Carreb provides accurate and reliable vehicle comparisons by sourcing data from trusted industry sources and government-backed databases, including the Green Vehicle Guide. Our AI-powered analysis ensures you have the information you need to make confident decisions. <a href="/" title="Go to the Know more page" className="hover:text-sky-400 underline decoration-sky-400">Click to Know more</a></p>
          </div>
          <div>
            <Image
              src="/images/car-brands-1.png"
              alt="Cars"
              width={200}
              height={200}
              className="w-auto w-full"
              priority
            />
          </div>
        </div>

      </section>


      {/* Pricing Section */}
      {isShowPricingPlans && (
      <section className="py-8 sm:py-12 bg-slate-200">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-10">Unlock Deeper Insights with Carreb Plans</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto px-1">
            {[
              { name: "Basic", price: "$9", feature: "Essential insights" },
              { name: "Standard", price: "$19", feature: "Detailed reports" },
              { name: "Pro", price: "$29", feature: "Advanced comparisons" },
              { name: "Business", price: "$49", feature: "Fleet management" },
              { name: "Enterprise", price: "$99", feature: "Custom analytics" }
            ].map((plan, index) => (
              <Card key={index} className="bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[240px] sm:min-w-0">
                <div className="h-32 sm:h-40 bg-white flex items-center justify-center border-b p-4">
                  {/* Plan icon or image placeholder */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-700">{plan.price}</span>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow">
                  <h3 className="font-semibold text-center text-base sm:text-lg">{plan.name}</h3>
                  <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">{plan.feature}</p>
                </CardContent>
                <CardFooter className="pt-0 pb-4 flex justify-center">
                  <Link href={`/pricing/${plan.name.toLowerCase()}`} passHref>
                    <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-50 text-xs sm:text-sm w-full sm:w-auto">
                      Buy now
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* How It Works Section */}
      {isShowHowItWorks && (
      <section className="py-8 sm:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">How does it work</h2>
          <p className="mb-6 sm:mb-10 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Dive in how do we help in finding out the right vehicle for you and save money
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-6 max-w-xs sm:max-w-2xl mx-auto">
            <div className="text-center w-full md:w-auto mb-6 md:mb-0">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-green-700 rotate-45 mx-auto mb-4 transform transition-transform duration-300 hover:rotate-[135deg]"></div>
                <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-green-700">1</span>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-md text-xs sm:text-sm">Enter your details</div>
            </div>
            
            <div className="hidden md:flex items-center">
              <div className="h-0.5 w-8 sm:w-16 bg-green-700"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#196f3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <div className="h-0.5 w-8 sm:w-16 bg-green-700"></div>
            </div>
            
            <div className="text-center w-full md:w-auto mb-6 md:mb-0">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-green-700 rotate-45 mx-auto mb-4 transform transition-transform duration-300 hover:rotate-[135deg]"></div>
                <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-green-700">2</span>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-md text-xs sm:text-sm">Choose from options</div>
            </div>
            
            <div className="hidden md:flex items-center">
              <div className="h-0.5 w-8 sm:w-16 bg-green-700"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#196f3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <div className="h-0.5 w-8 sm:w-16 bg-green-700"></div>
            </div>
            
            <div className="text-center w-full md:w-auto">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-2 border-green-700 rotate-45 mx-auto mb-4 transform transition-transform duration-300 hover:rotate-[135deg]"></div>
                <span className="absolute top-3 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-green-700">3</span>
              </div>
              <div className="bg-gray-100 px-3 py-2 rounded-md text-xs sm:text-sm">Get detailed results</div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Stats Section */}
      {isShowStats && (
      <section className="py-10 sm:py-16 bg-white border-t border-b">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Carreb users have saved</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold">
            <div className="bg-green-50 px-4 py-2 rounded-lg mb-2 md:mb-0">
              <span className="text-green-700">5,200+</span>
            </div>
            <span className="text-base sm:text-xl md:text-2xl">tons of CO2 and</span>
            <div className="bg-green-50 px-4 py-2 rounded-lg">
              <span className="text-green-700">$12M+</span>
            </div>
          </div>
          <p className="text-lg sm:text-xl mt-4 text-gray-700">to date</p>
          
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Link href="/auth/signup" passHref>
              <Button className="btn-dark-green text-sm sm:text-base px-6 py-3">
                Join the movement
              </Button>
            </Link>
          </div>
        </div>
      </section>
      )}

    </main>
  );
}