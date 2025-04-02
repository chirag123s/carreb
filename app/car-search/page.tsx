import React from 'react'
import FormNewCarFinder from '../components/FormNewCarFinder'
import FormSmartCarFinder from '../components/FormSmartCarFinder'
import MatchedCars from '../components/MatchedCars'

const page = () => {
  return (
    <div>
        <div className="container m-auto pt-12 pb-12">
            <div className="tabs tabs-box">
                <input type="radio" name="my_tabs_6" className="tab" aria-label="New car finder" defaultChecked />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <FormNewCarFinder />
                </div>

                <input type="radio" name="my_tabs_6" className="tab" aria-label="Smart car finder" />
                <div className="tab-content bg-base-100 border-base-300 p-6">
                    <FormSmartCarFinder />
                </div>
            </div>
        </div>
        <div className="container m-auto pt-12 pb-12" style={{minHeight: '60vh'}}>
            <div className="top-rated-cars">
            <h3 className="text-2xl font-bold mb-4">Select a car to compare</h3>
            <MatchedCars/>
            </div>
        </div>
    </div>
  )
}

export default page