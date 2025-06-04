"use client"
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronDown, X } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormItem, FormLabel, FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button";

// Form schema using Zod
const vehicleDetailsSchema = z.object({
  brand: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  fuel: z.string().optional(),
  year: z.string().optional(),
  kmPerAnnum: z.string().optional(),
});

type VehicleDetailsFormValues = z.infer<typeof vehicleDetailsSchema>;

interface VehicleDetailsModalProps {
  onSubmit: (data: VehicleDetailsFormValues) => void;
  onClose: () => void;
  formData: {
    saveMoney: boolean,
    greenerCar: boolean,
    goodAllRounder: boolean,
    state: string,
    budget: string,
  };
}
export default function VehicleDetailsModal({ onSubmit, onClose, formData}: VehicleDetailsModalProps) {
  const router = useRouter(); // Initialize the router
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  // Mock data for dropdowns
  const years = Array.from({ length: 20 }, (_, i) => (2025 - i).toString());

  const onFormSubmit = (data: VehicleDetailsFormValues) => {
    // Call the existing onSubmit function to handle the form data
    onSubmit(data);
    
    // Navigate to the smart-car-finder page
    router.push('/smart-car-finder');
  };

  type Car = {
      key: string;
      name: string;
  }
  type Model = {
      model: string;
  }
  type Year = {
      year: string;
  }
  type EngineType = {
      engine_type: string;
  }

  const [selectedCar, setSelectedCar] = useState("");
  const [carModels, setCarModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [carYears, setCarYears] = useState<Year[]>([]);
  const [selectedEngineType, setSelectedEngineType] = useState("");
  const [carEngineType, setCarEngineType] = useState<EngineType[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [cars, setCars] = useState<{ popular: Car[], all: Car[] }>({
      popular: [],
      all: []
  });
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        /*console.log(formData)
        console.log("make:", selectedCar);
        console.log("model:", selectedModel);
        console.log("year:", selectedYear);
        console.log("engine type :", selectedEngineType);
        */
        async function fetchCarMatch() {
            try {
                const postData = {
                    save_money: formData['saveMoney'],
                    greener_car: formData['greenerCar'],
                    good_all_rounder: formData['goodAllRounder'],
                    budget: formData['budget'],
                    state: formData['state'],
                    have_car: true,
                    make: selectedCar,
                    model: selectedModel,
                    year: selectedYear,
                    engine_type: selectedEngineType
                }
                const response = await fetch(`${apiUrl}/car/match/`, {
                    method: "POST",
                    credentials: 'include', // Importa
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify( postData)
                });
                const data = await response.json();
                
                if (response.ok) {
                    //const uniqueId = getCookie('crb_uid');
                    router.push('/smart-car-finder/?sid='+data.crb_uid);
                } else {
                    console.error(`Error: ${data.detail || "Failed to get car mat."}`);
                }
            } catch (error) {
                console.error("Error fetching car match:", error);
            }
        }
        fetchCarMatch() ;
    };

  const FormSchema = z.object({
    state: z
        .string({
            required_error: "Please select a State.",
        }),
    car_make: z
        .string({
            required_error: "Please select a car brand/make.",
        }),
    car_model: z
        .string({
            required_error: "Please select a car model.",
        }),
    car_year: z
        .string({
            required_error: "Please select a build year.",
        }),
    car_engine_type: z
        .string({
            required_error: "Please select a engine type.",
        }),
  })
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
      async function fetchCars() {
          try {
              const response = await fetch(`${apiUrl}/car/makes/`);
              const data = await response.json();
              setCars({ popular: data.popular, all: data.all });
          } catch (error) {
              console.error("Error fetching car data:", error);
          }
      }
      fetchCars();
  }, []);

  useEffect(() => {
      if (selectedCar) {
          setCarModels([]);
          setCarYears([]);
          setCarEngineType([]);

          async function fetchCarModels() {
              try {
                  const response = await fetch(`${apiUrl}/car/models/`, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify( {make: selectedCar})
                  });
                  const data = await response.json();
                  
                  if (response.ok) {
                      setCarModels(data.models); //.models);
                  } else {
                      console.error(`Error: ${data.detail || "Failed to get car model."}`);
                  }
              } catch (error) {
                  console.error("Error fetching car models:", error);
              }
          }
          fetchCarModels();
      }
  }, [selectedCar]);

  useEffect(() => {
      if (selectedCar && selectedModel) {
          setCarYears([]);
          setCarEngineType([]);

          async function fetchCarYears() {
              try {
                  const response = await fetch(`${apiUrl}/car/years/`, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify( {make: selectedCar, model: selectedModel})
                  });

                  const data = await response.json();
                  
                  if (response.ok) {
                      setCarYears(data.years);
                  } else {
                      console.error(`Error: ${data.detail || "Failed to get car years."}`);
                  }

              } catch (error) {
                  console.error("Error fetching year:", error);
              }
          }
          fetchCarYears();
      }
  }, [selectedModel]);


  useEffect(() => {
      if (selectedCar && selectedModel && selectedYear) {
          async function fetchCarEngineType() {
            setCarEngineType([]);

              try {
                  const response = await fetch(`${apiUrl}/car/engine-types/`, {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify( {make: selectedCar, model: selectedModel, year: selectedYear})
                  });

                  const data = await response.json();
                  
                  if (response.ok) {
                      setCarEngineType(data.engine_types);
                  } else {
                      console.error(`Error: ${data.detail || "Failed to get engine type."}`);
                  }

              } catch (error) {
                  console.error("Error fetching engine type:", error);
              }
          }
          fetchCarEngineType();
      }
  }, [selectedYear]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative">
        <>
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </>
        <>
          <h2 className="text-xl font-semibold text-gray-900 pr-8">Current vehicle details</h2>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="mt-5">
              <FormField
                control={form.control}
                name="car_make"
                render={({ field }) => (
                    <FormItem style={{ paddingBottom: '1.2em'}}>
                        <FormLabel>Make/Brand</FormLabel>
                        <Select onValueChange={setSelectedCar} value={selectedCar}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a car" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Popular Cars</SelectLabel>
                                    {cars.popular.map((car) => (
                                        <SelectItem key={car.key} value={'p-'+car.name}>{car.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>All Cars</SelectLabel>
                                    {cars.all.map((car) => (
                                        <SelectItem key={car.key} value={car.name}>{car.name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="car_model"
                render={({ field }) => (
                    <FormItem style={{ paddingBottom: '1.2em'}}>
                        <FormLabel>Model</FormLabel>
                        <Select onValueChange={setSelectedModel} value={selectedModel}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                {carModels.map((model) => (
                                    <SelectItem key={model.model} value={model.model}>{model.model}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="car_year"
                render={({ field }) => (
                    <FormItem style={{ paddingBottom: '1.2em'}}>
                        <FormLabel>Year</FormLabel>
                        <Select onValueChange={setSelectedYear} value={selectedYear}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a year" />
                            </SelectTrigger>
                            <SelectContent>
                                {carYears.map((year) => (
                                    <SelectItem key={year.year} value={year.year}>{year.year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="car_engine_type"
                render={({ field }) => (
                    <FormItem style={{ paddingBottom: '1.2em'}}>
                        <FormLabel>Engine type</FormLabel>
                        <Select onValueChange={setSelectedEngineType} value={selectedEngineType}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an engine type" />
                            </SelectTrigger>
                            <SelectContent>
                                {carEngineType.map((type) => (
                                    <SelectItem key={type.engine_type} value={type.engine_type}>{type.engine_type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )}
              />

              <div className="w-full text-center p-4">
                  <Button type="submit">Submit</Button>
              </div>

            </form>
          </Form>
        </>

      </div>
    </div>
  );
}