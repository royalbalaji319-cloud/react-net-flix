export const API_KEY = "b2af243de2275e776422275824ff35bd";
export const BASE_URL = "https://www.themoviedb.org/movie/now-playing";

// Example function to fetch trending movies
export const fetchTrendingMovies = async () => {
  const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`);
  const data = await res.json();
  return data.results;
};
