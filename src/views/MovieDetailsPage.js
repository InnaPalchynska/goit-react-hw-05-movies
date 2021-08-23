import { lazy, Suspense, useState, useEffect } from 'react';
import {
  NavLink,
  Link,
  useRouteMatch,
  useParams,
  Route,
  useLocation,
} from 'react-router-dom';
import * as moviesAPI from '../components/Services/apiService';
import style from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast-page" */));

const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews-page" */),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(data => setMovieDetails(data));
  }, [movieId]);
  return (
    <>
      <Link to={location?.state?.from?.location ?? '/movies'}>
        {location?.state?.from?.label ?? 'Назад'}
      </Link>
      {movieDetails && (
        <div className={style.thumb}>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movieDetails.backdrop_path}`}
            alt={movieDetails.title}
          />
          <div className={style.description}>
            <h2>{movieDetails.title}</h2>
            <p>Popularity: {movieDetails.popularity}</p>
            <h3>Overview:</h3>
            <p> {movieDetails.overview}</p>
            <h3>Genres:</h3>
            {movieDetails.genres.map(genre => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
        </div>
      )}

      <NavLink to={`${url}/cast`}>Cast</NavLink>
      <NavLink to={`${url}/reviews `}>Reviews </NavLink>

      <Suspense fallback={<h1>ЗАГРУЖАЕМ...</h1>}>
        <Route path={`${path}/cast`}>
          {movieDetails && <Cast movieId={movieId} />}
        </Route>
        <Route path={`${path}/reviews `}>
          {movieDetails && <Reviews movieId={movieId} />}
        </Route>
      </Suspense>
    </>
  );
}
