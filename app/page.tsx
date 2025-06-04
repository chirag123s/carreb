'use client'; // Add this for client components in Next.js 13+

import React from 'react';

import { useEffect, useState } from "react"
import Image from 'next/image';
import Link from 'next/link'; // Next.js Link component
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Head from 'next/head';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VehicleDetailsModal from "../app/components/VehicleDetailsModal"; // Import the modal component
import { boolean } from 'zod';
import { getCookie } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [isShowNotificationBar, setShowNotificationBar] = useState(false)
  const isShowPricingPlans = false
  const isShowStats = false
  const isShowHowItWorks = false
  
  // States for the form
  const [saveMoney, setSaveMoney] = useState(false)
  const [greenerCar, setGreenerCar] = useState(false)
  const [goodAllRounder, setGoodAllRounder] = useState(false)
  const [hasCar, setHasCar] = useState<string>("") //useState<string | null>(null)
  const [budget, setBudget] = useState<string>("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    saveMoney: false,
    greenerCar: false,
    goodAllRounder: false,
    budget: '',
    state: '',
    haveCar: '',
  });

  // Australian states
  const states = [
    "NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"
  ]
  
  // Function to handle vehicle details submission
  const handleVehicleDetailsSubmit = (data: any) => {
    console.log("Vehicle details:", data)
    setIsModalOpen(false)
    // Here you would typically process the data or send it to an API
  } 
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      async function fetchCarMatch() {
          try {
              const postData = {
                  save_money: saveMoney,
                  greener_car: greenerCar,
                  good_all_rounder: goodAllRounder,
                  budget: budget,
                  state: selectedState,
                  have_car: false,
                  make: "",
                  model: "",
                  year: "",
                  engine_type: ""
              }
              const response = await fetch(`${apiUrl}/car/match/`, {
                  method: "POST",
                  credentials: 'include', // Importa
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify( postData)
              });
              const data = await response.json();
              
              if (response.ok) {
                  //const uniqueId = getCookie('crb_uid');
                  router.push('/smart-car-finder/?sid='+data.crb_uid);
              } else {
                  console.error(`Error: ${data.detail || "Failed to get car mat."}`);
              }
          } catch (error) {
              console.error("Error fetching car match:", error);
          }
      }
      if (hasCar == 'no') {
        fetchCarMatch();
      }
  };

  useEffect(() => {
    /*const state = selectedState
    const whatMatterSaveMoney = saveMoney
    const whatMatterGreenerCar = greenerCar
    const whatMatterGoodAllRounder = goodAllRounder
    const setBudget = budget
    const selState = state*/

    setFormData({
      saveMoney: saveMoney,
      greenerCar: greenerCar,
      goodAllRounder: goodAllRounder,
      budget: budget,
      state: selectedState,
      haveCar: hasCar
    })
  }, [isModalOpen]);

  return (
    <main className="flex flex-col">
      {isModalOpen && (
        <VehicleDetailsModal 
          onSubmit={handleVehicleDetailsSubmit} 
          onClose={() => setIsModalOpen(false)} 
          formData={formData}
        />
      )}
      
      {isShowNotificationBar && (
      <div className="w-full bg-zinc-800 text-white py-1 px-4 text-center text-xs sm:text-sm">
          Notifications for discounts and other things can be shown here
      </div>
      )}

      {/* Car Preferences Section - ADDED FROM SCREENSHOT */}
      <section className="bg-slate-100 min-h-[70vh] py-10">
        <div className="container mx-auto px-10 lg:grid md:grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-green-500 ">Carreb takes the</span>
              <span className="text-green-500 block">complexity out of</span>
              <span className="text-green-500 block">choosing your new car.</span>
            </h2>
            
            <div className="mt-8">

              <form onSubmit={handleSubmit} className="mt-5">
                <h3 className="text-xl font-semibold mb-4">What matters the most to you?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="save-money" 
                      checked={saveMoney}
                      onCheckedChange={(checked) => setSaveMoney(checked as boolean)}
                      className="h-5 w-5 border-2 border-gray-300"
                    />
                    <label htmlFor="save-money" className="text-lg cursor-pointer">I want to save money</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="greener-car" 
                      checked={greenerCar}
                      onCheckedChange={(checked) => setGreenerCar(checked as boolean)}
                      className="h-5 w-5 border-2 border-gray-300"
                    />
                    <label htmlFor="greener-car" className="text-lg cursor-pointer">I want a greener car</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="all-rounder" 
                      checked={goodAllRounder}
                      onCheckedChange={(checked) => setGoodAllRounder(checked as boolean)}
                      className="h-5 w-5 border-2 border-gray-300"
                    />
                    <label htmlFor="all-rounder" className="text-lg cursor-pointer">I want a good all-rounder</label>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <div className="w-1/2">
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                      Budget
                    </label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="Enter your budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="rounded-md border-gray-300"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <Select value={selectedState} onValueChange={setSelectedState}>
                      <SelectTrigger className="rounded-md border-gray-300">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Do you have a car?</h3>
                  <div className="flex gap-3">
                    <button 
                      className={`rounded-full px-8 py-2 font-medium ${hasCar == 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-green-400'}`}
                      onClick={() => {
                        setHasCar('yes');
                        setIsModalOpen(true);
                      }}
                    >
                      YES
                    </button>
                    <button 
                      type="submit"
                      className={`rounded-full px-8 py-2 font-medium ${hasCar == 'no' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-green-400'}`}
                      onClick={() => {
                        setHasCar('no');
                      }}
                    >
                      NO
                    </button>
                  </div>
                </div>
                
              </form>
            </div>
          </div>
          
          <div className="flex items-right justify-center lg:justify-end mt-8 md:mt-0">
            <Image
              src="/images/happy-car-owner.jpg" // Assuming this path for the image
              alt="Happy car owner receiving keys"
              width={500}
              height={500}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>
{/*
      {/* Features Section /}
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
              <h3 className="font-bold mb-2 text-base sm:text-lg text-2xl">See the Clear CORE&trade; Rating</h3>
              <div className="grid grid-cols-2 mt-8 gap-4 ">
                <p>Our unique CORE&trade; Rating system simplifies complex data, giving you an easy-to-understand score for cost of ownership and environmental impact.</p>
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
{/*
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
/}

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
*/}

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