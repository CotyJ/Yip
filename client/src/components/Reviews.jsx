import React from 'react';
// import StarRating from './StarRating';

const Reviews = ({selectedRestaurant}) => {
  if (!selectedRestaurant.reviews) {
    return <div>Loading...</div>; // or show a loading state while data is being fetched
  }

  console.log("Reviews Component prop", selectedRestaurant)
  console.log("Reviews Component prop.reviews", selectedRestaurant.reviews)
  console.log("Reviews Component prop2[0]", selectedRestaurant.reviews[0])
  // console.log("Reviews prop", props.reviews.reviews[0])
  // props.reviews.reviews.map(review => {
  //   console.log("review here");
  // })
  return (
    <div className="row row-cols-3 mb-2">
      {/* {props.reviews.reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="card text-white bg-primary mb-3 mr-4"
            style={{ maxWidth: '30%' }}
          >
            <div className="card-header d-flex justify-content-between">
              <span>{review.name}</span>
              <span>
                <StarRating id={review.id} rating={review.rating} />
              </span>
            </div>
            <div className="card-body">
              <p className="card-text">{review.review}</p>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Reviews;
