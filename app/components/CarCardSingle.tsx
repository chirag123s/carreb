import Link from "next/link";
import Image from "next/image";

const CarCardSingle = ({car}:any) => {
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
        <div className="">
          <label className="flex gap-4"><input type="radio" name="radio-1" className="radio" /> Select </label>
        </div>
      </div>
    </div>
  );
};

export default CarCardSingle;
