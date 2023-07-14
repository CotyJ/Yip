import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let navigate = useNavigate();

  console.log(navigate);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (id) => {
    try {
      RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter( (restaurant) => {
        return restaurant.id !== id;
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/restaurants/${id}/update`)
  }

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{'$'.repeat(restaurant.price_range)}</td>
                  <td>reviews</td>

                  <td>
                    <button onClick={() => handleUpdate(restaurant.id)} className="btn btn-warning">Update</button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
