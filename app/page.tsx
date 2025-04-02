import Image from "next/image";
import Link from 'next/link'
import TopRatedCars from "./components/TopRatedCars";

export default function Home() {

  return (
    <main className="">
      <div className="hero-banner pt-12 pb-12">
        <div className="container lg:flex xlg:flex gap-x-50px">
          <div className="lg:w-1/2 lg:w-1/2">
            <h1>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</h1>
          </div>
          <div className="lg:w-1/2 xlg:w-1/2 lg:pl-20 lg:pr-20 text-center">
            <h2 className="pb-5">Excepteur sint occaecat cupidatat non pro</h2>
            <Link href="/current-car" className="btn-dark-green p-4">Compare your current car</Link>
            <p className="p-4">OR</p>
            <Link href="/car-search" className="btn-dark-green p-4">Find a new car</Link>
          </div>
        </div>
      </div>
      <div className="container m-auto pt-12 pb-12" style={{minHeight: '60vh'}}>
        <div className="top-rated-cars">
          <h3 className="text-2xl font-bold mb-4">Top rated Cars</h3>
          <TopRatedCars/>
        </div>
        <div className="top-rated-cars pt-12">
          <h3 className="text-2xl font-bold mb-4">How it works</h3>
            <p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
            <p><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>
            <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
        </div>
      </div>
    </main>
  );
}
