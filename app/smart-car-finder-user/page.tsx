'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import for navigation

const SmartCarFinder = () => {
  // State variables
  const [budget, setBudget] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [style, setStyle] = useState('');
  const [emissions, setEmissions] = useState('');
  const [coreRating, setCoreRating] = useState('');
  const [prompt, setPrompt] = useState('');
  
  // Router for navigation
  const router = useRouter();

  // Handle search button click
  const handleSearch = () => {
    // Navigate to search results page with query parameters
    router.push(`/search-results?budget=${budget}&fuel=${fuelType}&style=${style}&emissions=${emissions}&rating=${coreRating}`);
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-4 bg-white min-h-screen">
      {/* Left Section - Smart Car Finder */}
      <div className="flex-1 flex flex-col items-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Smart Car Finder</h2>
        
        {/* Form Elements */}
        <div className="w-full max-w-md space-y-4">
          {/* Budget Input */}
          <input 
            type="text" 
            placeholder="Budget" 
            className="w-full border border-gray-300 rounded-md p-3"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          
          {/* Fuel Type Dropdown */}
          <div className="relative w-full">
            <select 
              className="w-full border border-gray-300 rounded-md p-3 appearance-none bg-white"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="" disabled>Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Style Dropdown */}
          <div className="relative w-full">
            <select 
              className="w-full border border-gray-300 rounded-md p-3 appearance-none bg-white"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="" disabled>Style</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="hatchback">Hatchback</option>
              <option value="coupe">Coupe</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Emissions Dropdown */}
          <div className="relative w-full">
            <select 
              className="w-full border border-gray-300 rounded-md p-3 appearance-none bg-white"
              value={emissions}
              onChange={(e) => setEmissions(e.target.value)}
            >
              <option value="" disabled>Emissions</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          {/* CORE Rating Dropdown */}
          <div className="relative w-full">
            <select 
              className="w-full border border-gray-300 rounded-md p-3 appearance-none bg-white"
              value={coreRating}
              onChange={(e) => setCoreRating(e.target.value)}
            >
              <option value="" disabled>CORE Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
          
          {/* Search Button */}
          <button 
            className="w-full bg-green-400 hover:bg-green-500 text-center py-3 rounded-full text-black font-medium"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>
      
      {/* Right Section - AI Smart Match */}
      <div className="flex-1 flex flex-col items-center p-4 mt-6 md:mt-0">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Try AI Smart Match</h2>
        
        <div className="w-full max-w-md">
          {/* AI Prompt Input */}
          <div className="relative w-full border border-gray-300 rounded-md mb-4">
            <input 
              type="text" 
              placeholder="write prompt..." 
              className="w-full p-3 pr-12"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-full p-1 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          {/* AI Explanation Text */}
          <p className="text-sm text-gray-600">
            Let's find your smartest match. Tell us a bit about how you'll use your next car—like how
            many seats you need, where you drive most (city, rural, highway), and what matters most:
            low cost, sustainability, or style? We'll crunch the numbers and show you your best fit
            options.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartCarFinder;