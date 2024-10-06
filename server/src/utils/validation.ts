export const isValidRating = (rating: number): boolean => {
    return Number.isInteger(rating) && rating >= 1 && rating <= 10;
  };
  
  export const isValidDate = (date: string): boolean => {
    return !isNaN(Date.parse(date));
  };
  