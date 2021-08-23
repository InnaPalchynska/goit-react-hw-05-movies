import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from '../components/Services/apiService';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const queryValue = new URLSearchParams(location.search).get('query');
  const [query, setQuery] = useState(queryValue);
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    if (!queryValue) {
      return;
    }
    moviesAPI.fetchMovieBySearch(query).then(data => setMovies(data.results));
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    if (!query) {
      return;
    }
    history.push({ ...location, search: `query=${query}` });
    moviesAPI.fetchMovieBySearch(query).then(data => setMovies(data.results));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          onChange={target => setQuery(target.target.value)}
          placeholder="Enter movie "
        />
        <button type="submit">Search</button>
      </form>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
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
