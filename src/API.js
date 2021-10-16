import {
    SEARCH_BASE_URL,
    API_URL,
    API_KEY,
    REQUEST_TOKEN_URL,
    LOGIN_URL,
    SESSION_ID_URL,
    GET_TRENDING_MOVIE_URL,
    GET_TRENDING_TV_URL,
    SEARCH_LIST_URL,
    SEARCH_LIST_TV_URL,
    GET_MOVIE,
    GET_MOVIE_VIDEOS
} from './config';

const defaultConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const apiSettings = {
    fetchMovies: async (searchTerm, page) => {
        const endpoint = `${SEARCH_BASE_URL}&term=${searchTerm}&page=${page}`
        const response = await fetch(endpoint)
        const data = await response.json();
        return data;
    },
    fetchHdMovieClubMovies: async (searchTerm, page) => {
        const endpoint = `${SEARCH_LIST_URL}&page=${page}`;
        return await (await fetch(endpoint)).json();
    },
    fetchHdMovieClubShows: async (page) => {
        const endpoint = `${SEARCH_LIST_TV_URL}&page=${page}`;
        return await (await fetch(endpoint)).json();
    },
    fetchTrendingMovies: async (page) => {
        const endpoint = `${GET_TRENDING_MOVIE_URL}&page=${page}`;
        return await (await fetch(endpoint)).json();
    },
    fetchTrendingTVs: async (page) => {
        const endpoint = `${GET_TRENDING_TV_URL}&page=${page}`;
        return await (await fetch(endpoint)).json();
    },
    fetchMovie: async movieId => {
        const endpoint = `${GET_MOVIE}&movieId=${movieId}`;
        return await (await fetch(endpoint)).json();
    },
    fetchMovieVideos: async movieId => {
        const endpoint = `${GET_MOVIE_VIDEOS}&movieId=${movieId}`;
        return await (await fetch(endpoint)).json();
    },
    fetchPerson: async person_id => {
        const endpoint = `${API_URL}person/${person_id}?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchMovieGenres: async () => {
        const endpoint = `${API_URL}/genre/movie/list?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchCredits: async movieId => {
        const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },
    fetchTV: async tvId => {
        const endpoint = `${API_URL}tv/${tvId}?api_key=${API_KEY}`;
        // console.log(endpoint)
        return await (await fetch(endpoint)).json();
    },
    fetchTVGenres: async () => {
        const endpoint = `${API_URL}/genre/tv/list?api_key=${API_KEY}`;
        return await (await fetch(endpoint)).json();
    },
    fetchTVCredits: async tvId => {
        const creditsEndpoint = `${API_URL}tv/${tvId}/aggregate_credits?api_key=${API_KEY}`;
        return await (await fetch(creditsEndpoint)).json();
    },
    // Bonus material below for login
    getRequestToken: async () => {
        const reqToken = await (await fetch(REQUEST_TOKEN_URL)).json();
        return reqToken.request_token;
    },
    authenticate: async (requestToken, username, password) => {
        const bodyData = {
            username,
            password,
            request_token: requestToken
        };
        // First authenticate the requestToken
        const data = await (
            await fetch(LOGIN_URL, {
                ...defaultConfig,
                body: JSON.stringify(bodyData)
            })
        ).json();
        // Then get the sessionId with the requestToken
        if (data.success) {
            const sessionId = await (
                await fetch(SESSION_ID_URL, {
                    ...defaultConfig,
                    body: JSON.stringify({request_token: requestToken})
                })
            ).json();
            return sessionId;
        }
    },
    rateMovie: async (sessionId, movieId, value) => {
        const endpoint = `${API_URL}movie/${movieId}/rating?api_key=${API_KEY}&session_id=${sessionId}`;

        const rating = await (
            await fetch(endpoint, {
                ...defaultConfig,
                body: JSON.stringify({value})
            })
        ).json();

        return rating;
    }
};

export default apiSettings;
