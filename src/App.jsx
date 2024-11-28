import { useLoaderData } from 'react-router-dom'
import './App.css'

import { useState } from 'react';
import CoffeeCard from './components/Coffeecard';

function App() {
  const allCoffee = useLoaderData();
  const [coffees, setCoffees] = useState(allCoffee);


  return (
    <>
      <h1  className='text-purple-500 text-3xl my-10'>Coffee Store Client : {coffees.length}</h1>

      <div className='grid md:grid-cols-2 gap-2'>
        {
          coffees.map(coffee => <CoffeeCard key={coffee._id}
             coffee={coffee} coffees={coffees} setCoffees={setCoffees}></CoffeeCard>)
        }
      </div>
      
    </>
  )
}

export default App
