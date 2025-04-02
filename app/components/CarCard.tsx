import Link from "next/link";
import Image from "next/image";

const CarCard = ({car}:any) => {
  return (
    <div className="card">
      <figure 
            style={{
                backgroundColor: 'transparent',
                minHeight: '100px',
            }}>
        <Image 
            src={car.image} 
            alt={car.title} 
            width={150} 
            height={100} 
            className=""
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{car.title}</h2>
        <Link href={`/cars/${car.id}`} className="btn btn-success">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
