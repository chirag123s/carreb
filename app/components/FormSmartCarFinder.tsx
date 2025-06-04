import React from 'react'
/*import RangeSlider from './RangeSlider'*/

const FormSmartCarFinder = () => {
  return (
    <div>
        <h3>Let us help find your new car</h3>
        <form className='pt-4'>
            <div>
                { /*<RangeSlider minLimit={0} maxLimit={100} />*/ }
            </div>
            <div className='lg:grid grid-cols-4 gap-4 pt-4'>
                <select defaultValue="State" className="select">
                    <option disabled={true}>State</option>
                    <option>ACT</option>
                    <option>NSW</option>
                    <option>NT</option>
                    <option>QLD</option>
                    <option>SA</option>
                    <option>TAS</option>
                    <option>VIC</option>
                    <option>WA</option>
                </select>
                <select defaultValue="Body" className="select">
                    <option disabled={true}>Body</option>
                </select>
                <select defaultValue="Fuel type" className="select">
                    <option disabled={true}>Fuel type</option>
                </select>
                <select defaultValue="Fuel type" className="select">
                    <option disabled={true}>Rating</option>
                </select>
                <select defaultValue="CO2 Emission" className="select">
                    <option disabled={true}>CO2 Emission</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default FormSmartCarFinder