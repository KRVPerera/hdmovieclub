import {useContext, useEffect, useState} from "react"
import API from "../API";

// helpers
import {isPersistedState, isPersistedStateInLocal} from "../helpers"
import {Context} from "../Store";
import {getExpiryTime} from "../utils/utils"

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

const storageKey = "homeState"
const storageKeyHDMovieClub = "hdMovieClubInfo"

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

            // movies.results.sort((a,b) =>{
            //     return b.release_date - a.release_date;
            // } )
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

            let itemStr;
            if (!gState.clubOnState) {
                itemStr = isPersistedState(storageKey)
            } else {
                itemStr = isPersistedStateInLocal(storageKeyHDMovieClub)
            }
            if (!itemStr) {
                return
            }
            // const item = JSON.parse(itemStr)
            const now = new Date()
            if (now.getTime() > itemStr.expiry) {
                if (!gState.clubOnState) {
                    sessionStorage.removeItem(storageKey)
                } else {
                    localStorage.removeItem(storageKeyHDMovieClub)
                }
                return
            }
            const sessionState = itemStr.value
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

    useEffect(() => {
        if (!searchTerm)  {
            if (!state) {
                return
            }
            const item = {
                value: state,
                expiry: getExpiryTime(gState.clubOnState, 30),
            }
            if (!gState.clubOnState) {
                sessionStorage.setItem(storageKey, JSON.stringify(item))
            } else {
                localStorage.setItem(storageKeyHDMovieClub, JSON.stringify(item))
            }
        }
    }, [searchTerm, state, gState.clubOnState])

    return {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore, movieCount}
}