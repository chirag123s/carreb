import React from 'react'
import FormNewCarFinder from '../components/FormNewCarFinder'
import FormSmartCarFinder from '../components/FormSmartCarFinder'
import MatchedCars from '../components/MatchedCars'
import './style.css'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const page = () => {
  return (
    <div>
        <div className="car-search-box container m-auto pt-12 pb-12 w-full">
            <Tabs defaultValue="new-car-finder" className="w-full">
                <div className="pb-12 block text-center">
                    <TabsList>
                        <TabsTrigger value="new-car-finder" className='text-2xl p-4 pt-6 pb-6'>New car finder</TabsTrigger>
                        <TabsTrigger value="smart-car-finder" className='text-2xl p-4 pt-6 pb-6'>Smart car finder</TabsTrigger>
                    </TabsList>
                </div>
                <div className="w-100% border-solid border-2 p-4">
                    <TabsContent value="new-car-finder">
                        <FormNewCarFinder />
                    </TabsContent>
                    <TabsContent value="smart-car-finder">
                        <FormSmartCarFinder />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    </div>
  )
}

export default page