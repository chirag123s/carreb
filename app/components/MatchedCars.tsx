import React from 'react'
import CarCardSingle from "./CarCardSingle";

interface Cars{
    id: number;
    title: string;
    image: string;
}

const MatchedCars = async () => {
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
    <div className="pt-8">
        <div className="grid grid-cols-5 gap-4">
            {cars.map((car) => (
                <CarCardSingle key={car.id} car={car} />
            ))}
        </div>
    </div>
  )
}

export default MatchedCars