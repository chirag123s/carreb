import Image from "next/image";
import Link from 'next/link'
import TopRatedCars from "./components/TopRatedCars";
import { Mail, Search } from "lucide-react" 
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main>
      <div className="hero-banner py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="w-full md:w-1/2 space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              </h1>
              <p className="text-base md:text-lg text-white/80 hidden md:block">
                Find your perfect car match with our intelligent car recommendation system.
              </p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center text-center space-y-6 p-4 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold">Excepteur sint occaecat cupidatat non pro</h2>
              <Button size="lg" className="btn-dark-green text-base md:text-lg px-8 py-6">
                <Link href="/car-search" className="flex items-center gap-2">
                  Find a new car <Search className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 md:px-6 py-8 md:py-12">
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline">
            <h3 className="text-2xl font-bold">Top rated Cars</h3>
            <Link href="/car-search" className="text-green-700 hover:underline hidden md:block">
              View all cars →
            </Link>
          </div>
          <TopRatedCars />
          <div className="md:hidden flex justify-center">
            <Link href="/car-search" className="text-green-700 hover:underline">
              View all cars →
            </Link>
          </div>
        </section>

        <section className="mt-12 md:mt-16 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-2xl font-bold mb-6">How it works</h3>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-2">The standard Lorem Ipsum passage, used since the 1500s</h4>
                  <p className="text-sm md:text-base text-muted-foreground">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2">Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
                  <p className="text-sm md:text-base text-muted-foreground">
                    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
