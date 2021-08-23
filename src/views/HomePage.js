import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../components/Services/apiService';

export default function HomePage() {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    moviesAPI.fetchPopularMovies().then(data => setMovies(data.results));
  }, []);

  return (
    <>
      <h1>Trending today</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `movies/${movie.id}`,
                  state: {
                    from: {
                      location,
                      label: 'Go back',
                    },
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
