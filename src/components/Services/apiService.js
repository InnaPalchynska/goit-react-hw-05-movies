const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c27b75f2098a52933ae8847a9b55ad4e';

const searchParams = new URLSearchParams({
  api_key: API_KEY,
  page: 1,
});

async function fetchWithErrorHandling(url = '') {
  const response = await fetch(url);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopularMovies() {
  return fetchWithErrorHandling(`${BASE_URL}movie/popular?${searchParams}`);
}

export function fetchMovieBySearch(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie/?${searchParams}&query=${query}`,
  );
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?${searchParams}&language=en-US&append_to_response=images&include_image_language=en,null`,
  );
}

export function fetchMovieCastById(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?${searchParams}`,
  );
}

export function fetchMovieReviewsById(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?${searchParams}`,
  );
}
