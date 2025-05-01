import React from 'react'
import CarCard from "./CarCard";

interface Cars{
    id: number;
    title: string;
    image: string;
}

const TopRatedCars = async () => {
    /*const res = await fetch("/api/cars") // API endpoint
    const cars: Cars[] = await res.json();
    */
   const cars: Cars[] = [
        {id: 1, title: 'Car 1', image: '/images/car-icon-1.png'},
        {id: 2, title: 'Car 2', image: '/images/car-icon-1.png'},
        {id: 3, title: 'Car 3', image: '/images/car-icon-1.png'},
        {id: 4, title: 'Car 4', image: '/images/car-icon-1.png'},
        {id: 5, title: 'Car 5', image: '/images/car-icon-1.png'}
   ]

  return (
    <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {cars.map((car) => (
                <CarCard key={car.id} car={car} />
            ))}
        </div>
    </div>
  )
}

export default TopRatedCars