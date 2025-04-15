import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CarProps {
  car: {
    id: number;
    title: string;
    image: string;
  }
}

const CarCard = ({ car }: CarProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <div className="p-4 flex justify-center">
        <Image 
          src={car.image} 
          alt={car.title} 
          width={120} 
          height={80} 
          className="object-contain h-24"
        />
      </div>
      <CardContent className="pb-2 flex-grow">
        <h2 className="text-lg font-semibold text-center mb-2">{car.title}</h2>
        <p className="text-sm text-muted-foreground text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </CardContent>
      <CardFooter className="pt-2 pb-4 flex justify-center">
        <Button variant="outline" className="text-green-700 border-green-700 hover:bg-green-50">
          <Link href={`/cars/${car.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
