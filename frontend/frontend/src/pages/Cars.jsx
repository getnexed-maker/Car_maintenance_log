import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"


 function Cars() {
  const [cars, setCars] = React.useState([])
  const [error, setError] = React.useState("")
  const [showForm, setShowForm] = React.useState(false)
  const [brand, setBrand] = React.useState("")
  const [model, setModel] = React.useState("")
  const [year, setYear] = React.useState("")
  const [car_type, setCarType] = React.useState("")
  const [engine, setEngine] = React.useState("")
  const [mileage_unit, setMileageUnit] = React.useState("")
  const [generation, setGeneration] = React.useState("")

  function handleBrand(event) {
    const newValue = event.target.value;
    setBrand(newValue)
  }

  function handleModel(event) {
    const newValue = event.target.value;
    setModel(newValue)
  }

  function handleYear(event) {
    const newValue = event.target.value;
    setYear(newValue)
  }

  function handleCarType(event) {
    const newValue = event.target.value;
    setCarType(newValue)
  }

  function handleEngine(event) {
    const newValue = event.target.value;
    setEngine(newValue)
  }

  function handleMileageUnit(event) {
    const newValue = event.target.value;
    setMileageUnit(newValue)
  }

  function handleGeneration(event) {
    const newValue = event.target.value;
    setGeneration(newValue)
  }
async function fetchCars() {
      const url = "http://localhost:3000/cars"
      const response = await fetch(url, {method: "GET",  headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`

  }})
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      setCars(data)
    } else {
      setError("Failed fetching cars")
    }
  }

async function handleSubmit () {
const url = "http://localhost:3000/cars/add"
try {
const response = await fetch(url, {method: "POST",  headers: {
   "Content-Type": "application/json",
   "Authorization": `Bearer ${localStorage.getItem("token")}`,
}, 
  body: JSON.stringify({brand, model, year, car_type, engine, mileage_unit}
  )})
if (response.ok) {
  setBrand("")
  setModel("")
  setYear("")
  setCarType("")
  setEngine("")
  setMileageUnit("")
  setGeneration("")
  setShowForm(false)
  fetchCars()


} else {
  setError("Failed adding car")

}
} catch (err) {
  setError("Failed adding car")
  console.log(err)
}}


  useEffect(() => {
      fetchCars()
},[])

  const navigate = useNavigate()
  return (
    <div>
      <h1>Your Cars</h1>
      {Array.isArray(cars) && cars.map(car => (
        <div key={car.id} onClick={() => navigate(`/maintenance/${car.id}`)}>
          <h2>{car.brand} {car.model}</h2>
          <p>Generation: {car.generation} Year: {car.year} Type: {car.car_type} Engine: {car.engine} Mileage unit: {car.mileage_unit}</p>
          
        </div>
      ))}
      <p>{error}</p>
      {showForm && (
        <div>
          <h2>Add New Car</h2>
          <form>
            <input name="brand" type="text" placeholder="Brand" value={brand} onChange={handleBrand} />
            <input name="model" type="text" placeholder="Model" value={model} onChange={handleModel} />
            <input name="generation" type="text" placeholder="Generation" value={generation} onChange={handleGeneration} />
            <input name="year" type="number" placeholder="Year" value={year} onChange={handleYear} />
            <input name="car_type" type="text" placeholder="Type" value={car_type} onChange={handleCarType} />
            <input name="engine" type="text" placeholder="Engine" value={engine} onChange={handleEngine} />
            <input name="mileage_unit" type="text" placeholder="Mileage Unit" value={mileage_unit} onChange={handleMileageUnit} />
            <button type="button" onClick={handleSubmit}>Add Car</button><button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
      )}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Add car</button>
        
      )}
    </div>
  )
}

export default Cars