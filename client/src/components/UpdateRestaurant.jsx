import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [price_range, setPriceRange] = useState("")

  console.log(id) //delete

  useEffect( () => {
    const fetchData = async() => {
      const response = await (await RestaurantFinder.get(`/${id}`)).data.data.restaurant
      // console.log(response.data.data);
      setName(response.name);
      setLocation(response.location);
      setPriceRange(response.price_range);
    }
    fetchData();
  }, [id])

  return (
    <div>
      <form action="">

        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input value={name} onChange={e => setName(e.target.value)} id="name" className="form-control" type="text" />
        </div>

        <div className="form-control">
          <label htmlFor="location">Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} id="location" className="form-control" type="text" />
        </div>

        <div className="form-control">
          <label htmlFor="price_range">Price Range</label>
          <input value={price_range} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
        </div>

        <button className='btn btn-primary'>Submit</button>

      </form>
    </div>
  );
};

export default UpdateRestaurant;
