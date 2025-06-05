// app/pricing/PricingContent.tsx (Updated to support sid)
'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaSquareCheck, FaLock } from 'react-icons/fa6';
import PaymentButton from '../components/PaymentButton';

// Define interface for pricing tier structure
interface PricingTier {
  name: string;
  shortName: string;
  monthlyPrice: string;
  annualPrice: { price: string, monthly: string};
  bestFor: string;
  garageVehicles: number;
  pureCostView: boolean;
  coolView: boolean;
  allViews: boolean;
  financing: boolean;
  currentVehicleEntries: number;
  coreRating: string;
  scfSearch: string | false;
  saveShortlist: boolean;
  resaleValue: boolean;
  slug: string;
  monthlyPriceValue: number;
  annualPriceValue: number;
}

const PricingTable: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPaymentFrequency, setPaymentFrequencyValue] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [searchId, setSearchId] = useState<string | null>(null);

  // Get search ID from URL parameters
  useEffect(() => {
    const sid = searchParams.get('sid');
    setSearchId(sid);
  }, [searchParams]);

  // Define pricing tiers with added price values
  const PricingTiers: PricingTier[] = [
    {
      name: "STARTER ACCESS",
      shortName: "Free",
      monthlyPrice: "FREE",
      annualPrice: {price: "FREE", monthly: "N/A"},
      bestFor: "Just browsing?<br>This is perfect if you're exploring or curious about car costs without needing full details. See basic ownership costs for one vehicle at a time. ",
      garageVehicles: 1,
      pureCostView: true,
      coolView: false,
      allViews: false,
      financing: false,
      currentVehicleEntries: 1,
      coreRating: "PARTIAL",
      scfSearch: false,
      saveShortlist: false,
      resaleValue: false,
      slug: 'starter-access',
      monthlyPriceValue: 0,
      annualPriceValue: 0
    },
    {
      name: "SMART CHOICE",
      shortName: "Smart",
      monthlyPrice: "$6.99",
      annualPrice: {price: "$55.99", monthly: "$4.67"},
      bestFor: "Buying soon?<br>Compare up to 3 CORE and access smarter search tools to find better-value vehicles. Ideal for budget-conscious shoppers ready to take action.",
      garageVehicles: 3,
      pureCostView: true,
      coolView: true,
      allViews: false,
      financing: true,
      currentVehicleEntries: 2,
      coreRating: "FULL",
      scfSearch: "LIMITED",
      saveShortlist: true,
      resaleValue: false,
      slug: 'smart-choice',
      monthlyPriceValue: 6.99,
      annualPriceValue: 55.99
    },
    {
      name: "CORE ADVANTAGE",
      shortName: "CORE",
      monthlyPrice: "$14.99",
      annualPrice: {price: "$119.99", monthly: "$9.99"},
      bestFor: "Want the full story<br>story? Unlock all car views including resale impact and get access to 5 comparisons. Designed for buyers who want long-term savings and clear decision-making.",
      garageVehicles: 10,
      pureCostView: true,
      coolView: true,
      allViews: true,
      financing: true,
      currentVehicleEntries: 5,
      coreRating: "FULL",
      scfSearch: "FULL",
      saveShortlist: true,
      resaleValue: true,
      slug: 'core-advantage',
      monthlyPriceValue: 14.99,
      annualPriceValue: 119.99
    },
    {
      name: "FUL INSIGHT PRO",
      shortName: "Pro",
      monthlyPrice: "$29.99",
      annualPrice: {price: "$239.99", monthly: "$19.99"},
      bestFor: "Managing a fleet or helping others choose? <br> Access every tool, view, and vehicle—ideal for analysts, advisors, and households juggling multiple car decisions. ",
      garageVehicles: 30,
      pureCostView: true,
      coolView: true,
      allViews: true,
      financing: true,
      currentVehicleEntries: 20,
      coreRating: "FULL",
      scfSearch: "FULL",
      saveShortlist: true,
      resaleValue: true,
      slug: 'full-insight-pro',
      monthlyPriceValue: 29.99,
      annualPriceValue: 239.99
    }
  ];

  // Custom checkmark and X symbols to match the image
  const renderCheckOrX = (value: boolean | string): React.ReactNode => {
    if (value === true) {
      return <FaSquareCheck className="mx-auto text-green-500" size={15}/>;
    } else if (value === false) {
      return <FaLock className="mx-auto text-yellow-500" size={15} />;
    } else {
      return value;
    }
  };

  const handlePaymentSuccess = (sessionId: string) => {
    console.log('Payment successful, session ID:', sessionId);
    // Redirect will be handled by Stripe with sid parameter included
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment error:', error);
    setPaymentError(error.message);
    setIsProcessing(false);
  };

  const handlePaymentFrequencyChange = (value: string) => {
    setPaymentFrequencyValue(value);
  };

  const handleFreeSignup = () => {
    // For free tier, redirect to signup with search ID if available
    const signupUrl = searchId 
      ? `/signup?plan=starter-access&freq=free&sid=${searchId}`
      : `/signup?plan=starter-access&freq=free`;
    router.push(signupUrl);
  };

  return (
    <>
      {/* Search ID indicator */}
      {searchId && (
        <section className="bg-green-50 border-b border-green-200">
          <div className="container py-4">
            <div className="text-center">
              <p className="text-green-800 font-medium">
                🎯 Complete your car search journey! Choose a plan to save your results and get full access to CarReb.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="container pt-12 pb-12 ">
        <h2 className="text-center text-4xl font-bold mb-4 text-teal-900">It's <span className="carreb-green">easy</span> & <span className="carreb-green">free</span> to get started</h2>
        <h3 className="text-center text-5xl font-bold mb-4 text-teal-900">The two things everybody love.</h3>
      </section>
      
      <section className="container">
        <RadioGroup 
          className='flex gap-0 justify-center payment-frequencies'
          defaultValue="monthly"
          aria-label="View density"
          value={selectedPaymentFrequency}
          onValueChange={handlePaymentFrequencyChange}
          >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="option-monthly" />
            <Label className={`text-2xl border-1 rounded-l-lg ${selectedPaymentFrequency == 'monthly' ? 'active' : ''}`} htmlFor="option-monthly">Monthly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="annual" id="option-annual" />
            <Label className={`text-2xl border-1 rounded-r-lg ${selectedPaymentFrequency == 'annual' ? 'active' : ''}`} htmlFor="option-annual">Annual</Label>
          </div>
        </RadioGroup>
      </section>
      
      <section className="container pt-6 pb-6 lg:grid lg:grid-cols-4 lg:gap-6">
        { PricingTiers.map( (pricing, index) => (
          <div key={index} className="card-pricing bg-white shadow-lg mb-6 ml-6 mr-6 pb-6 lg:ml-0 lg:mr-0">
            <h4 className="text-center text-2l font-bold mb-4 bg-green-500 p-3">{ pricing.name }</h4>
            { selectedPaymentFrequency == 'monthly' ?(
              <>
                <h5 className="text-center text-2xl mb-4"><span className="font-bold">{ pricing.monthlyPrice }</span> { pricing.monthlyPrice != 'FREE' ? '/ month' : ''}</h5>
              </>
            ) : (
              <>
                <h5 className="text-center text-2xl mb-2"><span className="font-bold">{ pricing.annualPrice.price }</span> { pricing.annualPrice.price != 'FREE' ? '' : ''}</h5>
                <h6 className="text-center text-1xl mb-4">
                  { pricing.annualPrice.price != 'FREE' && (
                    <>
                      (<span className="font-bold">{ pricing.annualPrice.monthly }</span> /month)
                    </>
                  )}
                </h6>
              </>
            )}
            <div className="text-center">
              {pricing.monthlyPrice === 'FREE' ? (
                <Button 
                  onClick={handleFreeSignup}
                  className='bg-green-700 text-xl text-white font-normal'
                >
                  Get {pricing.shortName}
                </Button>
              ) : (
                <PaymentButton
                  amount={selectedPaymentFrequency === 'monthly' ? pricing.monthlyPriceValue : pricing.annualPriceValue}
                  productName={`${pricing.name} (${selectedPaymentFrequency === 'monthly' ? 'Monthly' : 'Annual'})`}
                  metadata={{
                    plan: pricing.slug,
                    frequency: selectedPaymentFrequency,
                    tier: pricing.shortName,
                    search_uid: searchId, // Include search ID in payment metadata
                  }}
                  buttonText={`Get ${pricing.shortName}`}
                  buttonClassName="bg-green-700 text-xl text-white font-normal"
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}
            </div>
            <div className="px-5 py-10 text-sm">
              <div className="text-center pb-5">
                <div><span className="font-bold">Best for&hellip;</span></div><div dangerouslySetInnerHTML={{ __html: pricing.bestFor }} />
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>My Garage Vehicles</div><div>{pricing.garageVehicles}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>CORE 'Pure Cost' view only</div><div>{renderCheckOrX(pricing.pureCostView)}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>CORE 'Pure Cost' & 'COOL' view</div><div>{renderCheckOrX(pricing.coolView)}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>All CORE views</div><div>{renderCheckOrX(pricing.allViews)}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>Financing</div><div>{renderCheckOrX(pricing.financing)}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>No. 'Current Vehicle' entries</div><div>{pricing.currentVehicleEntries}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>CORE Rating with Rationale</div><div>{pricing.coreRating}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>SCF Search + AI Smart Match<sup>*</sup></div><div>{renderCheckOrX(pricing.scfSearch)}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>Save shortlist<sup>*</sup> compare later</div><div>{renderCheckOrX(pricing.saveShortlist)}</div>
              </div>
              <div className="grid gap-3 grid-flow-row-dense grid-cols-2 border-b-1 py-2">
                <div>Estimating resale value impact</div><div>{renderCheckOrX(pricing.resaleValue)}</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default PricingTable;
