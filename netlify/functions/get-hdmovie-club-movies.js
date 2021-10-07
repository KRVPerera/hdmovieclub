import fetch from 'node-fetch';

const API_URL_V4 = 'https://api.themoviedb.org/4/';
const API_KEY = process.env.REACT_APP_API_KEY;
const SEARCH_LIST_URL = `${API_URL_V4}list/7104814?api_key=${API_KEY}&language=en-US`;

exports.handler = async function (event, context) {
    const page = event.queryStringParameters.page || 1;
    const endpoint = `${SEARCH_LIST_URL}&page=${page}`;
    const response = await fetch(endpoint, {headers: {Accept: "application/json"}});
    const data = await response.json().catch((error) => ({statusCode: 422, body: String(error)}));
    return ({
        statusCode: 200,
        body: JSON.stringify(data),
    })
}