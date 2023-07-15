import React from "react";

const StarRating = ({rating}) => {
  const stars = [];
  const solidStar = <i className="fa-solid fa-star text-warning"></i>;
  const emptyStar = <i className="fa-regular fa-star text-warning"></i>;
  const halfStar = <i className="fa-solid fa-star-half-stroke text-warning"></i>;

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(solidStar);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(halfStar)
    } else {
      stars.push(emptyStar);
    }
  }


  return (
    <>
      {stars}
    </>
  )
}

export default StarRating;