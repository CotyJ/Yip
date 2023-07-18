import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantContext } from '../context/RestaurantContext';
import StarRating from './StarRating';

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  let navigate = useNavigate();

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

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = async (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (restaurant.count) {
      return (
        <>
          <StarRating rating={restaurant.id} />
          <span className="text-warning ml-1">{`(${restaurant.count})`}</span>
        </>
      );
    } else {
      return <span className="text-warning ml-1">No Reviews</span>;
    }
  };

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
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{'$'.repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>

                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>

                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(e, restaurant.id)}
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
