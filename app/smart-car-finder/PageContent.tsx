"use client"

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { useAuth0 } from '@auth0/auth0-react';
import CarMatchCard from '../components/CarMatchCard';
import CarComparisonChartDemo from '../components/CarComparisonChart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
  const { user, isAuthenticated } = useAuth0();
  const [searchID, setSearchID] = useState('')
  const [loading, setLoading] = useState(true)
  const [carData, setCarData] = useState<CarData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isInGarage, setIsInGarage] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const value = searchParams.get('sid')
    setSearchID(value ?? '')
  }, [searchParams])

  useEffect(() => {
    if (searchID) {
      getCarSearchDetails();
    }
  }, [searchID]);

  useEffect(() => {
    // Check if user is authenticated and has this search in their garage
    if (isAuthenticated && user && searchID) {
      checkIfInGarage();
    }
  }, [isAuthenticated, user, searchID]);

  const getCarSearchDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const postData = { sid: searchID }
      console.log('Fetching car data for searchID:', searchID); // Debug log
      
      const response = await fetch(`${apiUrl}/car/match/by-id/`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
      });
      
      const data = await response.json();
      console.log('API Response:', data); // Debug log
      
      if (response.ok && data.status == 'ok') {
        setCarData(data.data);
        console.log('Car data set:', data.data); // Debug log
      } else {
        setError(data.message || 'Failed to fetch car data');
        console.error('API Error:', data); // Debug log
      }
    } catch (error) {
      console.error("Error fetching car match:", error);
      setError('Network error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const checkIfInGarage = async () => {
    if (!user?.sub) return;
    
    try {
      const response = await fetch(`${apiUrl}/garage/list/?user_id=${user.sub}`);
      const data = await response.json();
      
      if (response.ok && data.garage) {
        const hasSearch = data.garage.some((entry: any) => entry.original_search_uid === searchID);
        setIsInGarage(hasSearch);
      }
    } catch (error) {
      console.error("Error checking garage:", error);
    }
  };

  const handleAddToGarage = async () => {
    if (!isAuthenticated || !user?.sub || !user?.email) {
      // Redirect to signup with search ID
      window.location.href = `/pricing?sid=${searchID}`;
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/garage/move-search/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search_uid: searchID,
          user_id: user.sub,
          user_email: user.email,
          nickname: carData ? `${carData.make_name} ${carData.model}` : 'My Car'
        })
      });

      if (response.ok) {
        setIsInGarage(true);
      }
    } catch (error) {
      console.error("Error adding to garage:", error);
    }
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

  // Show loading spinner while loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-green-gradient">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-green-gradient">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <Button onClick={() => getCarSearchDetails()} className="bg-white text-green-800">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  // Show message if no searchID
  if (!searchID) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-green-gradient">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">No Search ID Found</h2>
          <p>Please provide a valid search ID to view results.</p>
        </div>
      </div>
    )
  }

  // Show message if no car data after successful API call
  if (!carData) {
    return (
      <div className="h-screen flex items-center justify-center bg-dark-green-gradient">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">No Car Data Found</h2>
          <p className="mb-4">No matching car data found for this search.</p>
          <Button onClick={() => getCarSearchDetails()} className="bg-white text-green-800">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-green-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto lg:mt-12 md:mt-12">
          
          {/* Action Bar for Authenticated Users */}
          {isAuthenticated && (
            <div className="mb-6 flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-white">
                <h2 className="text-lg font-semibold">Your Car Match Result</h2>
                <p className="text-sm text-green-100">Save this result to your garage for easy access</p>
              </div>
              <div className="flex gap-2">
                {isInGarage ? (
                  <Link href="/garage">
                    <Button variant="secondary">View in Garage</Button>
                  </Link>
                ) : (
                  <Button onClick={handleAddToGarage} className="bg-white text-green-800 hover:bg-green-50">
                    Add to My Garage
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Card Section */}
          <section className="my-24">
            <div className="w-full mx-auto">
              <CarMatchCard 
                searchID={searchID}
                data={carData}
              />
            </div>
          </section>

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