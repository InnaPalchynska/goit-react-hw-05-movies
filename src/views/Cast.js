import { useState, useEffect } from 'react';
import * as moviesAPI from '../components/Services/apiService';

export default function Cast({ movieId }) {
  const [movieCast, setMovieCast] = useState(null);
  useEffect(() => {
    moviesAPI.fetchMovieCastById(movieId).then(data => setMovieCast(data.cast));
  }, [movieId]);
  return (
    <>
      {movieCast && (
        <ul>
          {movieCast.map(actor => (
            <li key={actor.id}>
              <img
                src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2/${actor.profile_path}`}
                alt={actor.title}
              />
              <p key={actor.id}>{actor.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
