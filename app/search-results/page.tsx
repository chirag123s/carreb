'use client'

import React, { useState, useEffect } from 'react';
import CarsRating from '../components/CarsRating';

// Define TypeScript interfaces for our data structures
interface Car {
  id: number;
  make: string;
  model: string;
  style: string;
  year: string;
  image: string;
  rating: number;
  fuelSavings: string;
  emissionRating: number;
  emissionValue: string;
  starRating: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
}

// Sample car data - using your existing data structure
const carsData: Car[] = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla Sedan',
    style: 'Accent Sport',
    year: '2024',
    image: '/api/placeholder/240/130',
    rating: 5,
    fuelSavings: '$3,703 p.a.',
    emissionRating: 0.9,
    emissionValue: '487kg',
    starRating: 5,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Sedan'
  },
  {
    id: 2,
    make: 'Mazda',
    model: 'Mazda 3',
    style: 'Luxury LX',
    year: '2024',
    image: '/api/placeholder/240/130',
    rating: 5,
    fuelSavings: '$3,120 p.a.',
    emissionRating: 1.2,
    emissionValue: '520kg',
    starRating: 4,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    bodyType: 'Hatchback'
  },
  {
    id: 3,
    make: 'Mazda',
    model: 'Mazda 3',
    style: 'Luxury LX',
    year: '2024',
    image: '/api/placeholder/240/130',
    rating: 5,
    fuelSavings: '$2,980 p.a.',
    emissionRating: 1.4,
    emissionValue: '535kg',
    starRating: 3,
    fuelType: 'Diesel',
    transmission: 'Manual',
    bodyType: 'Sedan'
  },
  {
    id: 4,
    make: 'Mazda',
    model: 'Mazda 3',
    style: 'Luxury LX',
    year: '2024',
    image: '/api/placeholder/240/130',
    rating: 5,
    fuelSavings: '$2,800 p.a.',
    emissionRating: 1.6,
    emissionValue: '550kg',
    starRating: 2,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    bodyType: 'Hatchback'
  },
  {
    id: 5,
    make: 'Mazda',
    model: 'Mazda 3',
    style: 'Luxury LX',
    year: '2024',
    image: '/api/placeholder/240/130',
    rating: 5,
    fuelSavings: '$2,650 p.a.',
    emissionRating: 1.8,
    emissionValue: '570kg',
    starRating: 3,
    fuelType: 'Electric',
    transmission: 'Automatic',
    bodyType: 'SUV'
  },
  {
    id: 6,
    make: 'Mazda',
    model: 'Mazda 3',
    style: 'Touring',
    year: '2024',
    image: '/api/placeholder/240/130',
    rating: 5,
    fuelSavings: '$2,500 p.a.',
    emissionRating: 2.0,
    emissionValue: '590kg',
    starRating: 4,
    fuelType: 'Petrol',
    transmission: 'Manual',
    bodyType: 'Sedan'
  }
];

// Define interfaces for component props
interface FilterSectionProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onChange: (value: string) => void;
}

// Filter section component
const FilterSection: React.FC<FilterSectionProps> = ({ title, options, selectedValues, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={`${title}-${option}`}
              checked={selectedValues.includes(option)}
              onChange={() => onChange(option)}
              className="h-4 w-4 text-green-600 rounded"
            />
            <label htmlFor={`${title}-${option}`} className="ml-2 text-gray-700">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

interface RangeSliderProps {
  title: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

// Range slider component
const RangeSlider: React.FC<RangeSliderProps> = ({ title, min, max, value, onChange }) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">${min}</span>
        <span className="text-sm text-gray-600">${max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="text-center mt-2">
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Up to ${value}
        </span>
      </div>
    </div>
  );
};

interface StarRatingProps {
  rating: number;
}

// Star rating component
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400 text-xl">
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  onSelect: (car: Car) => void;
}

// Car card component
const CarCard: React.FC<CarCardProps> = ({ car, isSelected, onSelect }) => {
  return (
    <div 
      className={`flex p-4 mb-4 border rounded-lg bg-white hover:shadow-md transition-all cursor-pointer ${isSelected ? 'border-green-500 shadow-md' : 'border-gray-200'}`}
      onClick={() => onSelect(car)}
    >
      <div className="w-1/3 flex items-center">
        <img src={car.image} alt={`${car.make} ${car.model}`} className="rounded" />
      </div>
      <div className="w-2/3 pl-4">
        <div className="grid grid-cols-2">
          <div>
            <p className="text-gray-600">Make: <span className="font-semibold text-gray-800">{car.make}</span></p>
            <p className="text-gray-600">Model: <span className="font-semibold text-gray-800">{car.model}</span></p>
            <p className="text-gray-600">Style: <span className="font-semibold text-gray-800">{car.style}</span></p>
            <p className="text-gray-600">Year: <span className="font-semibold text-gray-800">{car.year}</span></p>
          </div>
          <div className="flex flex-col items-end justify-between">
            <StarRating rating={car.starRating} />
            <button 
              className="mt-2 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-xs border border-gray-300 flex items-center"
              onClick={(e) => {
                e.stopPropagation();
                // Add comparison logic here
              }}
            >
              <span className="mr-1">+</span> Add to Garage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CarFeaturesProps {
  car: Car;
}

// Additional car details component
const CarFeatures: React.FC<CarFeaturesProps> = ({ car }) => {
  return (
    <div className="w-full max-w-md mt-6 bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800">Vehicle Features</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Fuel Type</p>
            <p className="text-sm text-gray-500">{car.fuelType}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Transmission</p>
            <p className="text-sm text-gray-500">{car.transmission}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Body Type</p>
            <p className="text-sm text-gray-500">{car.bodyType}</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Annual Savings</p>
            <p className="text-sm text-gray-500">{car.fuelSavings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const CarComparisonPage: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(carsData[0]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(5000);
  
  // Filter states
  const [makes, setMakes] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);
  const [transmissions, setTransmissions] = useState<string[]>([]);
  
  // Get unique values for filters
  const uniqueMakes: string[] = [...new Set(carsData.map(car => car.make))];
  const uniqueFuelTypes: string[] = [...new Set(carsData.map(car => car.fuelType))];
  const uniqueBodyTypes: string[] = [...new Set(carsData.map(car => car.bodyType))];
  const uniqueTransmissions: string[] = [...new Set(carsData.map(car => car.transmission))];
  
  // Toggle filter selection
  const toggleFilter = (filter: string, value: string): void => {
    if (filter === 'makes') {
      setMakes(prevMakes => 
        prevMakes.includes(value) 
          ? prevMakes.filter(m => m !== value)
          : [...prevMakes, value]
      );
    } else if (filter === 'fuelTypes') {
      setFuelTypes(prevTypes => 
        prevTypes.includes(value) 
          ? prevTypes.filter(t => t !== value)
          : [...prevTypes, value]
      );
    } else if (filter === 'bodyTypes') {
      setBodyTypes(prevTypes => 
        prevTypes.includes(value) 
          ? prevTypes.filter(t => t !== value)
          : [...prevTypes, value]
      );
    } else if (filter === 'transmissions') {
      setTransmissions(prevTypes => 
        prevTypes.includes(value) 
          ? prevTypes.filter(t => t !== value)
          : [...prevTypes, value]
      );
    }
  };
  
  // Filter cars based on selected filters
  const filteredCars: Car[] = carsData.filter(car => {
    // Apply search filter
    const matchesSearch: boolean = car.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply make filter
    const matchesMake: boolean = makes.length === 0 || makes.includes(car.make);
    
    // Apply fuel type filter
    const matchesFuelType: boolean = fuelTypes.length === 0 || fuelTypes.includes(car.fuelType);
    
    // Apply body type filter
    const matchesBodyType: boolean = bodyTypes.length === 0 || bodyTypes.includes(car.bodyType);
    
    // Apply transmission filter
    const matchesTransmission: boolean = transmissions.length === 0 || transmissions.includes(car.transmission);
    
    // Apply price filter (using a simplified approach for demo purposes)
    const savingsValue: number = parseInt(car.fuelSavings.replace(/[^0-9]/g, ''));
    const matchesPrice: boolean = !priceRange || savingsValue <= priceRange;
    
    return matchesSearch && matchesMake && matchesFuelType && matchesBodyType && matchesTransmission && matchesPrice;
  });
  
  // Handle car selection
  const handleCarSelect = (car: Car): void => {
    setSelectedCar(car);
  };
  
  // Reset all filters
  const resetFilters = (): void => {
    setSearchTerm('');
    setPriceRange(5000);
    setMakes([]);
    setFuelTypes([]);
    setBodyTypes([]);
    setTransmissions([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Filters */}
        <div className="w-1/4 bg-white p-4 border-r border-gray-200 overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Filters</h2>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 border rounded-md"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <FilterSection 
              title="Make" 
              options={uniqueMakes}
              selectedValues={makes}
              onChange={(value) => toggleFilter('makes', value)}
            />
            
            <FilterSection 
              title="Fuel Type" 
              options={uniqueFuelTypes}
              selectedValues={fuelTypes}
              onChange={(value) => toggleFilter('fuelTypes', value)}
            />
            
            <FilterSection 
              title="Body Type" 
              options={uniqueBodyTypes}
              selectedValues={bodyTypes}
              onChange={(value) => toggleFilter('bodyTypes', value)}
            />
            
            <FilterSection 
              title="Transmission" 
              options={uniqueTransmissions}
              selectedValues={transmissions}
              onChange={(value) => toggleFilter('transmissions', value)}
            />
            
            <RangeSlider
              title="Maximum Annual Savings"
              min={1000}
              max={5000}
              value={priceRange}
              onChange={setPriceRange}
            />
            
            <button 
              onClick={resetFilters}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md mt-4"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Middle section - Car listings - ONLY THIS SECTION SHOULD BE SCROLLABLE */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-200 h-screen overflow-hidden">
          <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Select a Vehicle</h2>
            
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => (
                <CarCard 
                  key={car.id} 
                  car={car} 
                  isSelected={selectedCar?.id === car.id}
                  onSelect={handleCarSelect} 
                />
              ))
            ) : (
              <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p className="text-gray-600">No vehicles match your filters.</p>
                <button 
                  onClick={resetFilters}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right section - Car rating */}
        <div className="w-5/12 bg-gray-50 overflow-y-auto">
          {selectedCar ? (
            <div className="p-4 flex flex-col items-center">
              {/* Use your existing CarsRating component */}
              <CarsRating rating={selectedCar.rating} starRating={selectedCar.starRating} />
              
              {/* Additional car information */}
              <CarFeatures car={selectedCar} />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">Please select a car to view ratings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarComparisonPage;