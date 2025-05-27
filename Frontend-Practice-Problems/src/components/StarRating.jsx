import React, { useState } from "react";
import "./StarRating.scss";

function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [allowHalf, setAllowHalf] = useState(false);

  const handleClick = (value) => {
    setRating(value);
  };

  const getStarClass = (index) => {
    const value = index + 1;
    if (hover !== null) {
      return hover >= value ? "star filled" : "star";
    }
    return rating >= value ? "star filled" : "star";
  };

  return (
    <div className="rating-container">
      <label className="half-toggle">
        <input
          type="checkbox"
          checked={allowHalf}
          onChange={() => setAllowHalf(!allowHalf)}
        />
        Allow Half Stars
      </label>

      <div className="stars">
        {[...Array(5)].map((_, index) => {
          const fullValue = index + 1;
          const halfValue = index + 0.5;

          return (
            <div key={index} className="star-wrapper">
              {allowHalf && (
                <span
                  className={
                    (hover || rating) >= halfValue ? "star half filled" : "star half"
                  }
                  onMouseEnter={() => setHover(halfValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => handleClick(halfValue)}
                >
                  {/* ★ */}
                  *
                </span>
              )}
              <span
                className={getStarClass(index)}
                onMouseEnter={() => setHover(fullValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => handleClick(fullValue)}
              >
                {/* ★ */}
                *
              </span>
            </div>
          );
        })}
      </div>

      <div className="rating-value">Rating: {rating} / 5</div>
    </div>
  );
}

export default StarRating;
