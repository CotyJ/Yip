import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  const solidStar = "fa-solid fa-star text-warning";
  const emptyStar = "fa-regular fa-star text-warning";
  const halfStar = "fa-solid fa-star-half-stroke text-warning";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<i key={i} className={`${solidStar}`}></i>);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className={`${halfStar}`}></i>);
    } else {
      stars.push(<i key={i} className={`${emptyStar}`}></i>);
    }
  }

  return <>{stars}</>;
};

export default StarRating;
