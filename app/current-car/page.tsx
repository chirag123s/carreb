import FormCurrentCar from "../components/FormCurrentCar";
import MatchedCars from "../components/MatchedCars";

export default function Home() {

  return (
    <main className="">
      <div className="container m-auto pt-12 pb-12">
        <div className="form-container">
          <FormCurrentCar />
        </div>
      </div>
      <div className="container m-auto pt-12 pb-12" style={{minHeight: '60vh'}}>
        <div className="top-rated-cars">
          <h3 className="text-2xl font-bold mb-4">Select a car to compare</h3>
          <MatchedCars/>
        </div>
      </div>
    </main>
  );
}
