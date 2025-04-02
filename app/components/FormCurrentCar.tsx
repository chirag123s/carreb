import React from 'react'

const FormCurrentCar = () => {
  return (
    <div>
        <h3>Tell us about your current car</h3>
        <form className='lg:grid grid-cols-4 gap-4 pt-4'>
            <select defaultValue="Make/Brand" className="select">
                <option disabled={true}>Make/Brand</option>
                <option>Audi</option>
                <option>BMW</option>
                <option>Ford</option>
                <option>Hyundai</option>
                <option>Mazda</option>
                <option>Mercedes-Benz</option>
                <option>Mitsubishi</option>
                <option>Nissan</option>
                <option>Subaru</option>
                <option>Toyota</option>
                <option>Volkswagen</option>
            </select>
            <select defaultValue="Model" className="select">
                <option disabled={true}>Model</option>
            </select>
            <select defaultValue="Year" className="select">
                <option disabled={true}>Year</option>
            </select>
            <input type="text" placeholder="Mileage" className="input" />
            <input type="text" placeholder="Annual maintenance cost" className="input" />
            <input type="text" placeholder="Estimated resale" className="input" />
            <input type="text" placeholder="Insurance" className="input" />
            <input type="text" placeholder="Registration" className="input" />
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
        </form>
    </div>
  )
}

export default FormCurrentCar