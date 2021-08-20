import {useEffect, useState} from "react"
import API from "../API";

// helpers
import {isPersistedState} from "../helpers"
// import useWindowDimensions from "../components/utils";
// import {number} from "prop-types";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

const storageKey = "trendingMoviesState"

export const useTrendFetch = () => {
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)

    const fetchTrendingTvs = async (page) => {
        try {
            setError(false)
            setLoading(true)

            const tvs = await API.fetchTrendingTVs(page)

            setState(prevState => ({
                ...tvs,
                results:
                    page > 1 ? [...prevState.results, ...tvs.results] : [...tvs.results]
            }))
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    // initial render and search
    useEffect(() => {
        const sessionState = isPersistedState(storageKey)
        if (sessionState) {
            setState(sessionState)
            return
        }

        setState(initialState)
        fetchTrendingTvs(1)
    }, [])

    // load more
    useEffect(() => {
        if (!isLoadingMore) return;

        fetchTrendingTvs(state.page + 1);
        setIsLoadingMore(false);

    }, [isLoadingMore, state.page])

    // write to sessionStorage
    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(state))
    }, [state])

    return {state, loading, error, setIsLoadingMore}
}