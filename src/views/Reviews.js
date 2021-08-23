import { useState, useEffect } from 'react';
import * as moviesAPI from '../components/Services/apiService';

export default function Reviews({ movieId }) {
  const [movieReviews, setMovieReviews] = useState(null);
  useEffect(() => {
    moviesAPI.fetchMovieReviewsById(movieId).then(data => {
      if (data.results.length === 0) {
        return;
      }
      setMovieReviews(data.results);
    });
  }, [movieId]);
  return (
    <>
      {movieReviews ? (
        <ul>
          {movieReviews.map(rev => (
            <li key={rev.id}>
              <p style={{ fontWeight: 700 }}>Author: {rev.author}</p>
              <p>{rev.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet</p>
      )}
    </>
  );
}
