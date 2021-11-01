// Configuration for TMDB API
// Read more about the API here: https://developers.themoviedb.org/

const API_URL = 'https://api.themoviedb.org/3/';
const API_URL_V4 = 'https://api.themoviedb.org/4/';
const API_KEY = process.env.REACT_APP_API_KEY;

// const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=`;
const SEARCH_BASE_URL = `/.netlify/functions/search-movie?`;
// const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;
// For login and voting
const REQUEST_TOKEN_URL = `${API_URL}authentication/token/new?api_key=${API_KEY}`;
const LOGIN_URL = `${API_URL}authentication/token/validate_with_login?api_key=${API_KEY}`;
const SESSION_ID_URL = `${API_URL}authentication/session/new?api_key=${API_KEY}`;

// const SEARCH_LIST_URL = `${API_URL_V4}list/7104814?api_key=${API_KEY}&language=en-US`;
const SEARCH_LIST_URL = `/.netlify/functions/get-hdmovie-club-movies?`;
const FIND_SEARCH_LIST_URL = `/.netlify/functions/search-hdmovie-club-movies?`;
const GET_MOVIE = `/.netlify/functions/get-movie?`;
const GET_MOVIE_VIDEOS = `/.netlify/functions/get-movie-videos?`;
const SEARCH_LIST_TV_URL = `${API_URL_V4}list/7110171?api_key=${API_KEY}&language=en-US`;

const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w780';
const SHARE_SIZE = 'w500';
const TV_POSTER_SIZE = 'w300';

const GET_TRENDING_MOVIE_URL = `${API_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`;
const GET_TRENDING_TV_URL = `${API_URL}/trending/tv/week?api_key=${API_KEY}&language=en-US`;

export {
  SEARCH_BASE_URL,
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  TV_POSTER_SIZE,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL,
  GET_TRENDING_MOVIE_URL,
  GET_TRENDING_TV_URL,
  SEARCH_LIST_URL,
  SHARE_SIZE,
  SEARCH_LIST_TV_URL,
  GET_MOVIE,
  GET_MOVIE_VIDEOS,
  FIND_SEARCH_LIST_URL
};
