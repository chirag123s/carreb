"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import CarMatchCard  from '../components/CarMatchCard';
import  CarComparisonChartDemo  from '../components/CarComparisonChart';
import  CarRating  from '../components/CarsRating'; // Assuming this component exists in your project
import './style.css'; 

interface CarResultsPageProps {
  // Any page-level props can be added here
}

type CarData = {
  searchID: string;
  make_name: string;
  model: string;
  year: string;
  engineType: string;
  image: string;
  starRating: number;
  co2Rating: number;
  coo: number;
  matchCount: number;
  savings: number;
  co2: number;
  rating: number;
};


const PageContent: React.FC<CarResultsPageProps> = () => {
  const searchParams = useSearchParams()
  const [searchID, setSearchID] = useState('')
  const [loading, setLoading] = useState(true)
  const [carData, setCarData] = useState<CarData | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const value = searchParams.get('sid')
    setSearchID(value ?? '') // Fallback to empty string
  }, [searchParams])

  // Sample data for CarMatchCard
  const carMatchData = {
    carName: "Toyota Corolla",
    carImage: "https://images.unsplash.com/photo-1623869675781-80aa31012c78?q=80&w=2070&auto=format&fit=crop",
    starRating: 4,
    co2Rating: 2.7,
    matchCount: 1,
    monthlySavings: "1XX"
  };

  // Sample data for CarComparisonChart
  const carPoints = [
    { id: 'current', name: 'Current Car', x: 8, y: 15, isCurrent: true },
    { id: 'car1', name: 'Car 1', x: 20, y: 60 },
    { id: 'car2', name: 'Car 2', x: 30, y: 75 },
    { id: 'car3', name: 'Car 3', x: 40, y: 80 },
    { id: 'car4', name: 'Car 4', x: 60, y: 60 },
    { id: 'car5', name: 'Car 5', x: 75, y: 40 }
  ];
  
  const sections = [
    { color: 'rgba(241,91,105,1)', title: 'Low Match', percentage: 15 },
    { color: 'rgba(254,226,130,1)', title: 'Below Average', percentage: 15 },
    { color: 'rgba(31,158,107,1)', title: 'Good Match', percentage: 45 },
    { color: 'rgba(79,162,255,1)', title: 'Above Average', percentage: 15 },
    { color: 'rgba(64,56,255,1)', title: 'Excellent', percentage: 10 }
  ];

  useEffect(() => {

    const getCarSearchDetails = async () => {
      try {
          const postData = {
              sid: searchID
          }
          const response = await fetch(`${apiUrl}/car/match/by-id/`, {
              method: "POST",
              credentials: 'include',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify( postData)
          });
          const data = await response.json();
          
          if (response.ok) {
            console.log(data)
            if (data.status == 'ok') {
              setCarData(data.data);
            }
            
            setLoading(false)
          } else {
              console.error(`Error: ${data.detail || "Failed to get car mat."}`);
          }
      } catch (error) {
          console.error("Error fetching car match:", error);
      }
    };

    if (searchID) {
      getCarSearchDetails();
    }

  }, [searchID]);

  //if (loading) {
  if (!carData || !searchID) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-green-gradient">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-green-gradient">
      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto lg:mt-12 md:mt-12">
          {/* Card Section */}
          <section className="my-24">
            <div className="w-full mx-auto">
              <CarMatchCard 
                searchID={searchID}
                data={carData}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="hidden border-t border-gray-200 my-8"></div>

          {/* Chart Section */}
          <section>
            <h2 className="text-2xl text-white font-bold mb-4">Compare Your Options</h2>
            <p className="text-[#d9f99d] mb-6">
              See how your current car compares to our recommended alternatives based on 
              efficiency and user preference match.
            </p>
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <CarComparisonChartDemo />
            </div>
            
            {/* Additional information about the chart */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-md p-4">
              <h3 className="font-semibold text-lg mb-2">Understanding the Comparison</h3>
              <p className="mb-4">
                This chart shows how different car options compare to your current vehicle. 
                The higher the position on the curve, the better the match for your preferences.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your <strong>current car</strong> is represented by the black dot</li>
                <li>Recommended <strong>alternatives</strong> are shown as red dots</li>
                <li>The colored sections represent different match quality levels</li>
                <li>Cars in the <strong>green section</strong> are optimal matches for your needs</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PageContent;