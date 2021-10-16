import fetch from 'node-fetch';

const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = process.env.REACT_APP_API_KEY;

exports.handler = async function (event, context) {

    const movieId = event.queryStringParameters.movieId || 1;
    const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(endpoint, {headers: {Accept: "application/json"}});
    const data = await response.json().catch((error) => ({statusCode: 422, body: String(error)}));
    return ({
        statusCode: 200,
        body: JSON.stringify(data),
    })
}