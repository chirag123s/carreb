import React from 'react';
import CarsRating from '../components/CarMatchRatingCarRating';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';


type CarData = {
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
}

type Props ={
  data: CarData;
  searchID: string;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            i < rating ? 'text-yellow-400' : 'text-gray-300'
          } transition-colors duration-200`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={true}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="sr-only">{rating} out of 5 stars</span>
    </div>
  );
};

const CarMatchCard = ({searchID, data}: Props) => {
  const router = useRouter();

  const handleJoinNowClick = () => {
    const url = (searchID) ? '/pricing/?sid='+searchID : '/pricing';
    router.push(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full lg:max-w-screen-sm mx-auto transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#196f3d] to-[#27ae60] p-4 text-white">
        <h1 className="text-2xl font-bold text-center">Your car match</h1>
        <h2 className="text-[#d9f99d] text-center text-s mt-2">
          Sign-up to explore 25 other possible matches
        </h2>
      </div>

      {/* Car details card */}
      <div className="p-4 sm:p-5 md:p-6 card-details">
        <div className="bg-gray-50 rounded-lg overflow-hidden mb-5 border border-gray-100">
          <div className="p-3 sm:p-4 ">
            <div className="car-details">
              <div className="flex items-center min-h-24 background bg-gray-200">
                <img
                  src={data.image}
                  alt={data.make_name}
                  className="w-full transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">{data.make_name} {data.model} {data.year}</h3>
                <StarRating rating={data.starRating} />
              </div>
            </div>
            <div className="car-rating">
              <CarsRating data={data} />
            </div>
            { /*
            <div className="md:w-1/2 flex flex-col justify-between">
            
              <div className="mt-4 flex items-start justify-between">
                <div className="flex items-center">
                  
                  <span className="ml-2 text-xs text-gray-500">CO2 Rating</span>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800">{data.matchCount}</div>
                  <div className="text-xs text-gray-600">car match in<br />your area</div>
                </div>
              </div>
            </div>
            */}
          </div>
        </div>

        {/* Savings info */}
        <div className="mb-5 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center">
            <div className="text-3xl font-bold text-[#196f3d]">${data.savings.toLocaleString()}</div>
            <div className="ml-2 text-gray-600 text-xs sm:text-sm leading-tight">
              estimated monthly<br />savings
            </div>
          </div>
          <div className="bg-[#d9f99d] text-[#196f3d] text-xs font-semibold px-2 py-1 rounded">
            ECO SAVINGS
          </div>
        </div>

        {/* CTA button */}
        <div className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-white text-xs sm:text-sm text-center sm:text-left">
            Upgrade to a subscription and<br />experience the full value of CarReb.
          </div>
          <button  
            className="bg-[#196f3d] hover:bg-[#0e5530] transition-colors duration-200 text-white font-bold py-2 px-6 rounded-md w-full sm:w-auto focus:ring-2 focus:ring-offset-2 focus:ring-[#196f3d] focus:outline-none"
            onClick={handleJoinNowClick}
          >
            JOIN NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarMatchCard;