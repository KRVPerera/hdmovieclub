import {useContext, useEffect, useState} from "react"
import API from "../API";

// helpers
import {isPersistedState} from "../helpers"
import {Context} from "../Store";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

const storageKey = "homeState"

export const useHomeFetch = () => {
    const [gState] = useContext(Context)
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [movieCount, setMovieCount] = useState(0)

    const fetchMovies = async (page, searchTerm = "", clubOnState) => {
        try {
            setError(false)
            setLoading(true)
            let movies;
            if (!clubOnState) {
                movies = await API.fetchMovies(searchTerm, page)
            } else {
                movies = await API.fetchHdMovieClubMovies(searchTerm, page)
                setMovieCount(movies.total_results)
            }
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
        if (!searchTerm) {
            const sessionState = isPersistedState(storageKey)
            if (sessionState) {
                setState(sessionState)
                return
            }
        }

        setState(initialState)
        fetchMovies(1, searchTerm, gState.clubOnState)
    }, [searchTerm, gState.clubOnState])

    // load more
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchMovies(state.page + 1, searchTerm, gState.clubOnState);
        setIsLoadingMore(false);

    }, [isLoadingMore, searchTerm, state.page, gState.clubOnState])


    useEffect(() => {
        fetchMovies(1, searchTerm, gState.clubOnState);
    }, [gState.clubOnState, searchTerm])

    // write to sessionStorage
    useEffect(() => {
        if (!searchTerm) sessionStorage.setItem(storageKey, JSON.stringify(state))
    }, [searchTerm, state])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore, movieCount}
}