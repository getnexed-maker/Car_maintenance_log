import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"

 function Cars() {
  const [cars, setCars] = React.useState([])
  const [error, setError] = React.useState("")

  useEffect(() => {
      async function fetchCars() {
      const url = "http://localhost:3000/cars"
      const response = await fetch(url, {method: "GET",  headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`

  }})
    const data = await response.json()
    setCars(data.cars)
    if (!response.ok) {
      setError("Failed loading cars")
    }
}
fetchCars()
},[])

  const navigate = useNavigate()
  return (
    <div>
      <h1>Your Cars</h1>
      {cars.map(car => (
        <div key={car.id} onClick={() => navigate(`/maintenance/${car.id}`)}>
          <h2>{car.brand} {car.model}</h2>
          <p>Generation: {car.generation} Year: {car.year} Type: {car.car_type} Engine: {car.engine} Mileage unit: {car.mileage_unit}</p>
          <p>{error}</p>
        </div>
      ))}
    </div>
  )
}

export default Cars