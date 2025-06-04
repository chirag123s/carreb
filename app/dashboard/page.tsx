'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/compat/router'
import CarComparisonChart from 'app/components/CarComparisonChart';
import CarsRating from '../components/CarsRating';
import { Plus, Search, Info, Menu, X, DollarSign, Edit, MoreVertical } from 'lucide-react'; // Remove MenuIcon and MenuSquare

const CarComparisonPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [carMenuOpen, setCarMenuOpen] = useState(null); // Track which car's menu is open
  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Corolla',
      style: 'Ascent Sport',
      year: '2024',
      score: 4.5,
      isCurrentCar: true
    },
    {
      id: 2,
      make: 'Mazda',
      model: 'Mazda 3',
      style: 'Luxury LX',
      year: '2024',
      score: 4.2,
      isCurrentCar: false
    }
  ]);
  
  // Check if user is logged in
  useEffect(() => {
    // This is a placeholder for your actual authentication check
    // Replace with your actual auth check logic
    const checkLoginStatus = () => {
      // Example: check localStorage, cookies, or context for auth status
      const token = localStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };
    
    checkLoginStatus();
  }, []);
  
  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle navigation to smart car finder
  const handleSmartCarFinderClick = () => {
    const path = isLoggedIn ? '/smart-car-finder-user' : '/smart-car-finder';
    window.location.href = path;
  };

  // Toggle add options menu
  const toggleAddOptions = () => {
    setShowAddOptions(!showAddOptions);
  };

  // Handle add current vehicle
  const handleAddCurrentVehicle = () => {
    // Implement your add current vehicle logic here
    setShowAddOptions(false);
    // Additional code for adding current vehicle
  };

  // Handle add new vehicle
  const handleAddNewVehicle = () => {
    // Implement your add new vehicle logic here
    setShowAddOptions(false);
    // Additional code for adding new vehicle
  };

  // Toggle car menu
  const toggleCarMenu = (id:any) => {
    if (carMenuOpen === id) {
      setCarMenuOpen(null); // Close if already open
    } else {
      setCarMenuOpen(id); // Open the clicked car's menu
    }
  };

  // Handle car actions
  const handleEdit = (id:any) => {
    console.log('Edit car', id);
    setCarMenuOpen(null);
    // Add your edit logic here
  };

  const handleFinance = (id:any) => {
    console.log('Finance car', id);
    setCarMenuOpen(null);
    // Add your finance logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile header with menu button - only visible on small screens */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
        <h1 className="text-lg font-bold">My Garage</h1>
        <button 
          onClick={toggleMobileMenu} 
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main content */}
      <div className={`flex flex-col md:flex-row p-3 md:p-4 gap-6 md:gap-4 transition-all ${isMobileMenuOpen ? 'mt-0' : ''}`}>
        {/* Left side - Car list */}
        <div className="w-full md:w-1/2 bg-gray-100 p-3 md:p-4 rounded-lg">
          <div className="flex flex-col mb-4">
            {/* Conditionally render either the add car button or the expanded menu */}
            {!showAddOptions ? (
              <div className="flex justify-between">
                <button 
                  className="bg-green-400 text-black rounded-full px-4 py-3 text-sm flex items-center w-full min-h-[46px] touch-manipulation"
                  onClick={toggleAddOptions}
                >
                  <Plus size={18} className="mr-2" />
                  <span>add car</span>
                  <div className="ml-auto">
                  </div>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <button 
                  className="bg-green-400 text-black rounded-full px-4 py-3 text-sm flex items-center w-full min-h-[46px] touch-manipulation"
                  onClick={handleAddCurrentVehicle}
                >
                  <Plus size={18} className="mr-2" />
                  <span>Add current vehicle</span>
                  <Info size={18} className="ml-auto" />
                </button>
                
                <button 
                  className="bg-green-400 text-black rounded-full px-4 py-3 text-sm flex items-center w-full min-h-[46px] touch-manipulation"
                  onClick={handleAddNewVehicle}
                >
                  <Plus size={18} className="mr-2" />
                  <span>Add a new vehicle</span>
                  <Info size={18} className="ml-auto" />
                </button>
                
                <button 
                  className="bg-green-400 text-black rounded-full px-4 py-3 text-sm flex items-center w-full min-h-[46px] touch-manipulation"
                  onClick={handleSmartCarFinderClick}
                >
                  <Search size={18} className="mr-2" />
                  <span>Smart Car Finder</span>
                  <Info size={18} className="ml-auto" />
                </button>
              </div>
            )}
          </div>

        {/* Car list */}
        <div className="space-y-4">
          {cars.map((car) => (
            <div key={car.id} className="flex items-center bg-white rounded-md p-4 shadow-sm relative">
              <div className="mr-4 relative">
                <CarsRating/>
              </div>
              <div className="flex-1">
                <img src="/api/placeholder/150/80" alt={`${car.make} ${car.model}`} className="mb-2" />
              </div>
              <div className="flex-1">
                {car.isCurrentCar && <div className="mb-1 font-bold">My Car</div>}
                <div className="text-sm">Make: {car.make}</div>
                <div className="text-sm">Model: {car.model}</div>
                <div className="text-sm">Style: {car.style}</div>
                <div className="text-sm">Year: {car.year}</div>
              </div>
              {/* Three dots menu in the absolute top right */}
              <div className="absolute top-4 right-4">
                  <button 
                    onClick={() => toggleCarMenu(car.id)}
                    className="p-1 rounded-full hover:bg-gray-200"
                    aria-label="Options"
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Dropdown menu */}
                  {carMenuOpen === car.id && (
                    <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                      <div className="py-1">
                        <button 
                          onClick={() => handleEdit(car.id)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <Edit size={16} className="mr-2" /> Edit
                        </button>
                        <button 
                          onClick={() => handleFinance(car.id)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <DollarSign size={16} className="mr-2" /> Finance
                        </button>
                      </div>
                    </div>
                  )}
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Graph and rating info */}
      <div className="w-full md:w-1/2">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Where do other cars sit<br />on the CORE spectrum?
          </h2>
          
          {/* Import the CarComparisonChart component */}
          <div className="relative">
            <CarComparisonChart />
            
            {/* Legend */}
            <div className="absolute top-0 right-0 bg-white bg-opacity-80 p-2 rounded-md text-xs">
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span>Pure Cost</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 rounded-full border border-gray-300 bg-white mr-2"></div>
                <span>COOL Choice</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-4 h-4 rounded-full border border-gray-300 bg-white mr-2"></div>
                <span>True Value</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full border border-gray-300 bg-white mr-2"></div>
                <span>Full Picture</span>
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm mt-2">
            Click to view and add vehicles to MyGarage+
          </div>
        </div>

        {/* CORE Rating table */}
        <div className="border border-gray-200 rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left">Stars</th>
                <th className="p-2 text-center">CORE<br />Rating</th>
                <th className="p-2 text-left">Meaning</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="p-2 text-green-500">★★★★★</td>
                <td className="p-2 text-center">5</td>
                <td className="p-2 text-sm">
                  <span className="font-bold">Exceptional:</span> Among the best on the market for total cost of ownership, powertrain, emissions, and long-term cost-of-living savings.
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-2 text-green-300">★★★★☆</td>
                <td className="p-2 text-center">4</td>
                <td className="p-2 text-sm">
                  <span className="font-bold">Strong:</span> Delivers great ownership savings and reduced emissions. A smart, future-proof choice.
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-2 text-yellow-500">★★★☆☆</td>
                <td className="p-2 text-center">3</td>
                <td className="p-2 text-sm">
                  <span className="font-bold">Moderate:</span> Solid overall, with a fair balance of costs and emissions. A sensible pick for most households.
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-2 text-orange-300">★★☆☆☆</td>
                <td className="p-2 text-center">2</td>
                <td className="p-2 text-sm">
                  <span className="font-bold">Low:</span> Higher ownership costs and emissions. May still suit specific needs but less optimal overall.
                </td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-2 text-red-500">★☆☆☆☆</td>
                <td className="p-2 text-center">1</td>
                <td className="p-2 text-sm">
                  <span className="font-bold">Limited:</span> Costlier to own and run. High emissions. Better options exist to help reduce Cost of Living and Emissions.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CarComparisonPage;