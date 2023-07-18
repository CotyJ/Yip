import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = (props) => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {selectedRestaurant && (
        <>{selectedRestaurant.restaurant &&
        (<>
        <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
        <div className='text-center'>
        <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
        <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count ?  `(${selectedRestaurant.restaurant.count})` : "(0)"}
            </span>
      </div>
      </>
        )}
        <div className='text-center'>

        </div>
          <div className="mt-3">
            <Reviews selectedRestaurant={selectedRestaurant} />
          </div>
            <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
