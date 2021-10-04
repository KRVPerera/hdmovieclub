import fetch from 'node-fetch';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;
const SEARCH_BASE_URL = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US`;
const POPULAR_BASE_URL = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US`;

exports.handler = async function (event, context) {
    const term = event.queryStringParameters.term || "";
    const page = event.queryStringParameters.page || 1;
    let endpoint;
    if (term !== "") {
        endpoint = `${SEARCH_BASE_URL}&query=${term}&page=${page}`;
    } else {
        endpoint = `${POPULAR_BASE_URL}&page=${page}`;
    }
    const response = await fetch(endpoint, {headers: {Accept: "application/json"}});
    const data = await response.json().catch((error) => ({statusCode: 422, body: String(error)}));
    return ({
        statusCode: 200,
        body: JSON.stringify(data),
    })
}