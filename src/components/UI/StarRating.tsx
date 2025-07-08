import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 5,
  interactive = false,
  onRatingChange
}) => {
  const stars = [];

  const handleStarClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  for (let i = 0; i < 5; i++) {
    const isFilled = i < rating;
    const isHalfFilled = i < rating && rating % 1 !== 0 && i === Math.floor(rating);

    stars.push(
      <button
        key={i}
        onClick={() => handleStarClick(i)}
        disabled={!interactive}
        className={`${
          interactive 
            ? 'cursor-pointer hover:scale-110 transition-transform' 
            : 'cursor-default'
        }`}
      >
        <Star
          className={`w-${size} h-${size} ${
            isFilled || isHalfFilled 
              ? 'text-yellow-400 fill-current' 
              : 'text-gray-600'
          }`}
        />
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-1">
      {stars}
    </div>
  );
};

export default StarRating;