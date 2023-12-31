import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect( () => {
    const fetchData = async() => {
      const response = await (await RestaurantFinder.get(`/${id}`)).data.data.restaurant
      setName(response.name);
      setLocation(response.location);
      setPriceRange(response.price_range);
    }
    fetchData();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();

    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  }

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
          <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" className="form-control" type="number" />
        </div>

        <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>

      </form>
    </div>
  );
};

export default UpdateRestaurant;
