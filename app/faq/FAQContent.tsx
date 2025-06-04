import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import './style.css'; 
import { FaStar, FaRegStar } from 'react-icons/fa';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function FAQContent() {
  return (
    <>
      <Head>
        <title>Carreb - FAQ</title>
      </Head>
      <div className="mb-8">
        <div className="relative min-h-[400px] flex items-center justify-center text-white">
          <div className="container">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/bg-zaptec-wLNqCa0TFIY-unsplash.jpg')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent w-full"></div>

            <div className="relative text-left z-10 px-4">
              <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            </div>
          </div>
        </div>
        <section className="container bg-green-100 px-10 py-5 mt-5">
          <p className='text-lg'>
            <span className='font-bold'>Carreb</span> is Australia’s first AI-powered platform that reveals the true cost of owning a new car — financially and environmentally. It’s not a car review site, and it doesn’t sell vehicles. Instead, Carreb uses real-world data, smart modelling, and user inputs to help you make confident, cost-effective, and climate-conscious decisions. Most existing tools are either confusing, biased, or focus on features—not affordability or emissions. Carreb simplifies what matters most. 
          </p>
        </section>
        <section className="container pt-8 pb-8">
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-2lg font-bold'>How does Carreb work? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb calculates: </p>
                <ul className='list-disc p-revert'>
                  <li>🧮 Cost of Ownership (COO): Total spend over time including fuel, servicing, and optional finance </li>
                  <li>🌱 CO₂ Emissions: Based on your location, energy source, and vehicle type </li>
                  <li>💸 Your Estimated Savings: Compared to your current vehicle </li>
                  <li>⭐ CORE™ Rating: A combined score of COO + CO₂ (1 to 5 stars) </li>
                  <li>🤖 Smart Car Finder (SCF) and AI Smart Search to match you with the right vehicle </li>
                </ul>
                <p>No spreadsheets. No stress. No PhD in mathematics required. Just clear answers—fast. You’ll know more in 5 minutes than most people learn in 5 weeks. </p>
                <p>We use data from trusted government sources, manufacturer specifications, and real-world ownership assumptions. </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className='text-2lg font-bold'>Is Carreb only for new cars? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Yes, at launch Carreb focuses exclusively on new vehicles to ensure the most accurate, relevant and trusted outputs. Used vehicle support is in development. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className='text-2lg font-bold'>Is Carreb for Australia only? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb will launch first in Australia — a market uniquely affected by rising car ownership costs, fragmented emissions data, and growing consumer demand for clarity. However, the Carreb platform has been purpose-built for global scalability. Our data architecture, cost-of-ownership modelling, and emissions framework are adaptable to the fuel standards, financial structures, and regulatory environments of other developed nations.</p>
                <p>Our data architecture, cost-of-ownership modelling, and emissions framework are adaptable to the fuel standards, financial structures, and regulatory environments of other developed nations. As a world-first transparency engine — not a review or sales platform — Carreb is well positioned for rapid international expansion into regions where consumers face similar confusion around vehicle affordability, sustainability, and long-term ownership costs. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger className='text-2lg font-bold'>What is the CORE&trade; Rating? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>The CORE<sup>&trade;</sup> (Cost of Ownership and Responsible Emissions) Rating is a 1–5 star benchmark that combines COO and CO₂ emissions into one easy-to-understand rating. It’s fact-based, not opinion-based — designed to cut through noise and marketing. Unlike star ratings based on features or style, CORE focuses purely on objective costs and emissions — factors that directly affect your wallet and the planet. </p>
                <table className="bordered table-auto">
                  <thead>
                    <tr>
                      <th>Stars</th>
                      <th>CORE Rating</th>
                      <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="star-ratings text-green-600"><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></td>
                      <td className='text-center'>5</td>
                      <td><span className="font-bold">EXCEPTIONAL:</span> Among the best on the market for total cost of ownership, emissions, and long-term cost-of-living savings. </td>
                    </tr>
                    <tr>
                      <td className="star-ratings text-green-800"><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/></td>
                      <td className='text-center'>4</td>
                      <td><span className="font-bold">STRONG</span>: Delivers great ownership savings and responsible emissions. A smart, future-proof choice. </td>
                    </tr>
                    <tr>
                      <td className="star-ratings text-amber-500"><FaStar/><FaStar/><FaStar/><FaRegStar/><FaRegStar/></td>
                      <td className='text-center'>3</td>
                      <td><span className="font-bold">MODERATE:</span> Solid overall, with a fair balance of costs and emissions. A sensible pick for most households. </td>
                    </tr>
                    <tr>
                      <td className="star-ratings text-red-500"><FaStar/><FaStar/><FaRegStar/><FaRegStar/><FaRegStar/></td>
                      <td className='text-center'>2</td>
                      <td><span className="font-bold">LOW:</span> Higher ownership costs or emissions. May still suit specific needs but less optimal overall. </td>
                    </tr>
                    <tr>
                      <td className="star-ratings text-red-700"><FaStar/><FaRegStar/><FaRegStar/><FaRegStar/><FaRegStar/></td>
                      <td className='text-center'>1</td>
                      <td><span className="font-bold">LIMITED:</span> Costlier to own and run or environmentally intensive. Better options exist to help reduce Cost of Living and Emissions. </td>
                    </tr>
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger className='text-2lg font-bold'>Who is Carreb for? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Anyone wanting car cost clarity — including: </p>
                <ul className='list-disc p-revert'>
                  <li>First-time buyers needing confidence</li>
                  <li>Families budgeting for cost and space </li>
                  <li>Commuters looking to lower fuel bills </li>
                  <li>Retirees focused on reliability and low running costs </li>
                  <li>Environmentally conscious drivers comparing hybrids/EVs </li>
                  <li>Fleets and businesses seeking transparency </li>
                  <li>Small business/fleet managers needing long-term cost clarity</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger className='text-2lg font-bold'>How accurate are Carreb’s numbers?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb uses:</p>
                <ul className='list-disc p-revert'>
                  <li>Government and manufacturer data </li>
                  <li>International WLTP emissions standards </li>
                  <li>Localised modelling by state </li>
                  <li>AI-enhanced data checking </li>
                </ul>
                <p>You control the inputs — such as km/year, finance terms, etc.. — for custom relevance and greater accuracy. We update our models regularly to reflect fuel prices, loan rates, and policy changes. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-7">
              <AccordionTrigger className='text-2lg font-bold'>Where do you get your emissions data?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Emissions are calculated using trusted Government sources that rely on international WLTP test standards, state based fuel costs and electricity costs and emissions tailored to your state’s energy mix. </p>
                <p>If you use home solar or renewables, you can update your inputs so Carreb can reflect this in your results—giving you more accurate results for a better decision.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-8">
              <AccordionTrigger className='text-2lg font-bold'>Can I trust Carreb’s finance and resale numbers?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb provides indicative estimates only. Our resale values are based on conservative depreciation benchmarks, but actual resale outcomes may vary significantly depending on brand, condition, mileage, demand, and market cycles. Finance costs use average industry rates over 5 years, but you can adjust these. Users can also include or exclude finance and resale assumptions in their personal view settings. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-9">
              <AccordionTrigger className='text-2lg font-bold'>What are the different cost views?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Choose from 4 views subject to subscription level: </p>
                <table className="table-auto">
                  <tbody>
                    <tr>
                      <td className='p-1'>🟢</td>
                      <td>Pure Cost (Excludes financing or estimated resale value after 5yrs)</td>
                    </tr>
                    <tr>
                      <td className='p-1'>🔘</td>
                      <td>COOL Choice - Cost Of Living Choice (Includes financing, excludes estimated resale value after 5yrs)</td>
                    </tr>
                    <tr>
                      <td className='p-1'>🔘</td>
                      <td>True Value Later (Excludes financing, includes estimated resale value after 5yrs) </td>
                    </tr>
                    <tr>
                      <td className='p-1'>🔘</td>
                      <td>Full Picture (Includes financing and estimated resale value after 5yrs)</td>
                    </tr>
                  </tbody>
                </table>
                <p>These help you balance upfront costs vs. long-term value. You can switch views with a single click to see what matters most to you.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-10">
              <AccordionTrigger className='text-2lg font-bold'>What is the Smart Car Finder (SCF)?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb offers two powerful tools:</p>
                <p>🧭 Smart Car Finder (SCF): This tool uses your selected filters—such as budget, fuel type, usage, and ownership goals—to instantly match you with suitable cars. It's fast, intuitive, and ideal when you have clear criteria in mind. </p>
                <p>🧠 AI Smart Search: This tool allows you to describe your situation in natural language using a text prompt (e.g., 'I’m a family of five with a long commute and a $45k budget'). Our AI will interpret your needs and suggest tailored options based on cost, CO₂, and usability. </p>
                <p>Many users start with filters, then refine their results via Smart Search prompts. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-11">
              <AccordionTrigger className='text-2lg font-bold'>Is Carreb free?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb offers tiered plans starting with a FREE service to help you find a car that suits your budget and lifestyle. </p>
                <p>Whether you want to compare one car or dive deep into cost breakdowns across ten, there’s a Carreb plan to match your needs. 👉 For a full breakdown of features and pricing, please visit our Pricing Page at carreb.com.au/pricing. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-12">
              <AccordionTrigger className='text-2lg font-bold'>Are you sponsored or funded by brands? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb is committed to independence and transparency. While advertisers may choose to promote their brands on our platform in future, such commercial relationships will never influence or alter the CORE Rating or any cost, CO₂, or savings calculations. </p>
                <p>The CORE Rating is based purely on data, not commercial incentives. Any promotional content will be clearly marked as such. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-13">
              <AccordionTrigger className='text-2lg font-bold'>Can I use Carreb for business/fleet decisions? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Yes. We’re building dedicated tools for fleets and small businesses. Email hello@carreb.com to learn more or register your interest. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-14">
              <AccordionTrigger className='text-2lg font-bold'>What if I buy a car based on Carreb’s advice? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb provides indicative insights only. While we use real data and robust modelling, you must always cross-check major purchases. We are not responsible for outcomes or decisions based on Carreb data. See our Terms of Use for full disclaimers. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-15">
              <AccordionTrigger className='text-2lg font-bold'>Does Carreb use AI? Is it always accurate? </AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Yes, Carreb incorporates AI to analyse data and match cars. While our tools are continually validated, some outputs may reflect outdated or partial public data. We encourage users to check inputs and treat outputs as advisory. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-16">
              <AccordionTrigger className='text-2lg font-bold'>Is my personal data safe?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Absolutely. Carreb complies with the Australian Privacy Act. Your personal data is encrypted, never sold, and stored securely in Australian-based servers. View our Privacy Policy for full details. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-17">
              <AccordionTrigger className='text-2lg font-bold'>When was Carreb launched?</AccordionTrigger>
              <AccordionContent className="text-base">
                <p>Carreb launched June 2025. </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-18">
              <AccordionTrigger className='text-2lg font-bold'>How do I contact Carreb?</AccordionTrigger>
              <AccordionContent className="text-base">
                  <div>General: <a href="mailto:contact@carreb.com.au" title="Mail to contact@carreb.com.au">contact@carreb.com.au</a></div>
                  <div>Media: <a href="mailto:media@carreb.com.au" title="Mail to media@carreb.com.au">media@carreb.com</a></div>
                  <div>Location: Brisbane, Australia </div>
                  <div>Follow us on <a href="https://www.instagram.com/carreb2025/" target="_blank" title="Go to Instagram">Instagram</a> & <a href="https://www.linkedin.com/company/carreb/posts/?feedView=all" target="_blank" title="Go to LinkedIn">LinkedIn</a> for updates </div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </section>
      </div>
    </>
  )
}