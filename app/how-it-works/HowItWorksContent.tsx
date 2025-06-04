import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function HowItWorksContent() {
  return (
    <>
      <div className="mb-8">
        <div className="relative min-h-[400px] flex items-center justify-center text-white">
          <div className="container">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/bg-zaptec-wLNqCa0TFIY-unsplash.jpg')" }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent w-full"></div>

            <div className="relative text-left z-10 px-4">
              <h1 className="text-4xl font-bold">How it works</h1>
            </div>
          </div>
        </div>
        <section className="container pt-12 pb-12 ">
          <h2 className="text-center text-4xl font-bold mb-4 text-teal-900">USE <span className="carreb-green">CARREB</span> IN 3 SMART STEPS</h2>
          <div className="mt-10 pl-2 pr-2 lg:p-0 ">
            <Card className="lg:w-200 m-auto mt-10 mb-10">  
              <CardContent className="flex">
                <div className="pr-4">
                  <Image
                      src="/images/icons/icon-car-1.png"
                      alt="Car icon"
                      width={50}
                      height={50}
                      className="w-auto w-full"
                      priority
                    />
                </div>
                <div>
                  <h3>Got a car? Let's compare</h3>
                  <p>Add a few details about your current vehicle. We'll show you your real-world savings</p>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:w-200 m-auto mt-10 mb-10">  
              <CardContent className="flex">
                <div className="pr-4">
                  <Image
                      src="/images/icons/icon-filter-1.png"
                      alt="Filter icon"
                      width={50}
                      height={50}
                      className="w-auto w-full"
                      priority
                    />
                </div>
                <div>
                  <h3>Explore deeper with smart tools</h3>
                  <p>User premium features to compare vehicles, refine filters, and explore smarter alternatives with AI-powered insights.</p>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:w-200  m-auto  mt-10 mb-10">  
              <CardContent className="flex">
                <div className="pr-4">
                  <Image
                      src="/images/icons/icon-globe-1.png"
                      alt="Globe icon"
                      width={50}
                      height={50}
                      className="w-auto w-full"
                      priority
                    />
                </div>
                <div>
                  <h3>Make a confident choice</h3>
                  <p>No guestwork. No overwhelm. Just real numbers to guide your best decision &mdash; for your life, your wallet, and the planet</p>
                </div>
              </CardContent>
            </Card>
          </div>

        </section>
        <section className="container pt-12 pb-12  text-center">
          <h3 className="text-center text-3xl font-bold mb-4 text-teal-900">What is CORE rating?</h3>
          <Image
            src="/images/CORE-rating-1.png"
            alt="Globe icon"
            width={1080}
            height={397}
            className="lg:w-8/12 w-full m-auto mt-12"
            priority
          />
        </section>

      </div>
    </>
  )
}