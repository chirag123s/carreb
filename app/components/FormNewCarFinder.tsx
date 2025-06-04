"use client"
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormItem, FormLabel, FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"  
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import { get } from 'http';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils"

const FormNewCarFinder = () => {

    type Variant = {
        variant: string;
        car_model_id: string;
        // add more fields as needed
    };
    type VariantResponse = {
        variants: Record<string, Variant>;
    };
    
    type Series = {
        series: string;
        car_model_id: string;
        // add more fields as needed
    };
    type SeriesResponse = {
        series: Record<string, Series>;
    };
    
    type Car = {
        key: string;
        name: string;
    }
    type Model = {
        car_model_id: string;
        family: string;
    }
    type State = {
        state_id: string;
        short_name: string;
    }
    type Match = {
        car_model_id: string;
        make: string;
        family: string;
        variant: string;
        series: string;
        year: string;
        style: string;
        engine: string;
        cc: string;
        size: string;
        transmission: string;
        cylinder: string;
    }


    const [states, setStates] = useState<State[]>([]);
    const [selectedState, setSelectedState] = useState("");
    /*const [cars, setCars] = useState({ popular: [], all: [] });*/
    const [cars, setCars] = useState<{ popular: Car[], all: Car[] }>({
        popular: [],
        all: []
    });
    const [selectedCar, setSelectedCar] = useState("");
    const [carModels, setCarModels] = useState<Model[]>([]); //useState<CarModelData | []>([]); //*/
    const [selectedModel, setSelectedModel] = useState("");
    
    const [selectedCarMatch, setSelectedCarMatch] = useState("");
    
    /*const [carVariants, setCarVariants] = useState([]); 
    const [selectedVariant, setSelectedVariant] = useState("");*/
    const [carVariants, setCarVariants] = useState<Variant[]>([]);
    /*const [selectedVariant, setSelectedVariant] = useState<string | null>(null);*/
    const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);


    /*const [carSeries, setCarSeries] = useState([]); 
    const [selectedSeries, setSelectedSeries] = useState("")*/
    const [carSeries, setCarSeries] = useState<Series[]>([]);
    /*const [selectedSeries, setSelectedSeries] = useState<string | null>(null);*/
    const [selectedSeries, setSelectedSeries] = useState<string | undefined>(undefined);

    const [carMatches, setCarMatches] = useState<Match[]>([]);
    const [carCompare, setCarCompare] = useState([]);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const isLoggedIn = false;

    useEffect(() => {

        async function fetchStates() {
            try {
                const response = await fetch(`${apiUrl}/states/`);
                const data = await response.json();
                setStates(data.states);
            } catch (error) {
                console.error("Error fetching States data:", error);
            }
        }
        fetchStates();

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
            setCarMatches([]);
            setCarModels([]);
            setCarVariants([]);
            setCarSeries([]);

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
            async function fetchCarVariants() {
                try {
                    const response = await fetch(`${apiUrl}/car/variants/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify( {make: selectedCar, model: selectedModel})
                    });
                    /*const data = await response.json();
                    
                    if (response.ok) {
                        setCarVariants(data.variants);
                        if (data.variants.length == 1) {
                            const variant = Object.values(data.variants)[0];
                            setSelectedVariant( variant.variant );
                        }
                    } else {
                        console.error(`Error: ${data.detail || "Failed to get car variant."}`);
                    }
                        */
                    const data: VariantResponse = await response.json();

                    if (response.ok) {
                        const variantsArray = Object.values(data.variants);
                        setCarVariants(variantsArray);

                        if (variantsArray.length === 1) {
                            setSelectedVariant(variantsArray[0].variant);
                        }
                    } else {
                        console.error(`Error: ${"detail" in data ? data.detail : "Failed to get car variant."}`);
                    }

                } catch (error) {
                    console.error("Error fetching car variant:", error);
                }
            }
            fetchCarVariants();
        }
    }, [selectedModel]);

    useEffect(() => {
        if (selectedCar && selectedModel && selectedVariant) {
            async function fetchCarSeries() {                
                try {
                    const response = await fetch(`${apiUrl}/car/series/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify( {make: selectedCar, model: selectedModel, variant: selectedVariant})
                    });
                    /*const data = await response.json();
                    
                    if (response.ok) {
                        setCarSeries(data.series);
                        if (data.series.length == 1) {
                            const series = Object.values(data.series)[0];
                            setSelectedSeries( series.series );
                        }
                    } else {
                        console.error(`Error: ${data.detail || "Failed to get car series."}`);
                    }*/
                    const data: SeriesResponse = await response.json();

                    if (response.ok) {
                        const seriesArray = Object.values(data.series);
                        setCarSeries(seriesArray);

                        if (seriesArray.length === 1) {
                            setSelectedVariant(seriesArray[0].series);
                        }
                    } else {
                        console.error(`Error: ${"detail" in data ? data.detail : "Failed to get car variant."}`);
                    }
                } catch (error) {
                    console.error("Error fetching car series:", error);
                }
            }
            fetchCarSeries();
        }
    }, [selectedVariant]);

    useEffect(() => {
        if (selectedCar && selectedModel && selectedVariant && selectedSeries) {
            async function fetchCarMatches() {
                try {
                    const response = await fetch(`${apiUrl}/car/matches/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify( {make: selectedCar, model: selectedModel, variant: selectedVariant, series: selectedSeries})
                    });
                    const data = await response.json();
                    
                    if (response.ok) {
                        setCarMatches(data);
                    } else {
                        console.error(`Error: ${data.detail || "Failed to get car matches."}`);
                    }
                } catch (error) {
                    console.error("Error fetching car matches:", error);
                }
            }
            fetchCarMatches();
        }
    }, [selectedSeries]);

    useEffect(() => {
        if (selectedCarMatch) {
            async function fetchCarSuggestions() {
                try {
                    const response = await fetch(`${apiUrl}/car/suggestions/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify( {car_id: selectedCarMatch})
                    });
                    const data = await response.json();
                    
                    if (response.ok) {
                        setCarCompare(data);
                    } else {
                        console.error(`Error: ${data.detail || "Failed to get car suggestions."}`);
                    }
                } catch (error) {
                    console.error("Error fetching car suggestions:", error);
                }
            }
            fetchCarSuggestions();
        }
    }, [selectedCarMatch]);


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
        car_variant: z
            .string({
                required_error: "Please select a car variant.",
            }),
        car_series: z
            .string({
                required_error: "Please select a car series.",
            }),
        match_cars: z
            .string({
                required_error: "Please select a car that match.",
            }),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Selected car:", selectedCar);
        console.log("Selected model:", selectedModel);
        console.log("Selected variants:", selectedVariant);
    };

    return (
        <div>
            <h3>What new car are you looking for?</h3>
            <Form {...form}>
                <form onSubmit={handleSubmit}>
                    <div className='sm:block lg:grid grid-cols-4 gap-4 pt-4'>
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
                                                <SelectItem key={model.car_model_id} value={model.family}>{model.family}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="car_variant"
                            render={({ field }) => (
                                <FormItem style={{ paddingBottom: '1.2em'}}>
                                    <FormLabel>Variant</FormLabel>
                                    <Select onValueChange={setSelectedVariant} value={selectedVariant}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a variant" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carVariants.map((variant) => (
                                                <SelectItem key={variant.car_model_id} value={variant.variant}>{variant.variant}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="car_series"
                            render={({ field }) => (
                                <FormItem style={{ paddingBottom: '1.2em'}}>
                                    <FormLabel>Series</FormLabel>
                                    <Select onValueChange={setSelectedSeries} value={selectedSeries}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a series" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {carSeries.map((series) => (
                                                <SelectItem key={series.car_model_id} value={series.series}>{series.series}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem style={{ paddingBottom: '1.5em'}}>
                                    <FormLabel>State</FormLabel>
                                    <Select onValueChange={setSelectedState} value={selectedState}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a State" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem key={state.state_id} value={state.short_name}>{state.short_name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    {(carMatches.length >= 1) &&  
                        <div className="w-full p-8">
                            <h3 className="pb-4">We found these matching car(s), select a car that you like</h3>
                            <FormField
                                control={form.control}
                                name="match_cars"
                                render={({ field }) => (
                                    <RadioGroup onValueChange={setSelectedCarMatch}>
                                        {carMatches.map( (match) => (
                                            <FormItem key={match.car_model_id} className="flex items-center space-x-3 space-y-0 mb-4 border-2 border-gray-100 rounded-md p-2  hover:bg-lime-50">
                                                <FormControl>
                                                    <RadioGroupItem value={match.car_model_id}  className='p-2'/>
                                                </FormControl>
                                                <div>
                                                    <FormLabel className="font-normal block p-2">
                                                        {match.make} {match.family} {match.variant} {match.series} {match.year}
                                                        <p className="text-sm text-muted-foreground">
                                                            {match.style}, {match.engine}, {match.cc}, {match.size}, {match.transmission}, {match.cylinder} 
                                                        </p>
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        ))}
                                    </RadioGroup>
                                )}
                            />
                        </div>
                    }

                    {(carCompare.length >= 1) &&
                        <div>
                            {carCompare.map( (car) => (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notifications</CardTitle>
                                        <CardDescription>You have 3 unread messages.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-4">
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full">
                                            Mark all as read
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    }


                    <div className="w-full text-center p-8">
                        <Button type="submit">Search now</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default FormNewCarFinder