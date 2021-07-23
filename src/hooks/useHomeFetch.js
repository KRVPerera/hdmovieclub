import {useEffect, useState} from "react";
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    console.log(searchTerm)

    const fetchMovies = async (searchTerm = "", page) => {
        try {
            setError(false)
            setLoading(true)

            const movies = await API.fetchMovies(searchTerm, page)
            setState(prevState => ({
                ...movies,
                results:
                    page > 1 ? [...prevState.results, ...movies.results] : [...movies.results]
            }))
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    // initial render and search
    useEffect(() => {
        fetchMovies(1)
    }, [searchTerm])

    return {state, loading, error, setSearchTerm}
}