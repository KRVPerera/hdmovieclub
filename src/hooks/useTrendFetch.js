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

const storageKey = "trendingMoviesState"

export const useTrendFetch = () => {
    const [gState] = useContext(Context)
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [isLoadingMore, setIsLoadingMore] = useState(false)
    const [loadWidth, setLoadWidth] = useState(10)
    const [scrollRight, setScrollRight] = useState(false);
    const [tvCount, setTvCount] = useState(0)


    const fetchTrendingTvs = async (page, clubOnState) => {
        try {
            setError(false)
            setLoading(true)

            let locPage = page;
            let tvs;

            if (!clubOnState) {
                tvs = await API.fetchTrendingTVs(page)
                setState(prevState => ({
                    ...tvs,
                    results:
                        locPage > 1 ? [...prevState.results, ...tvs.results] : [...tvs.results]
                }))

            } else {
                tvs = await API.fetchHdMovieClubShows(1)
                setState(({
                    ...tvs,
                    results: [...tvs.results]
                }))
                setTvCount(tvs.total_results)
            }
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTrendingTvs(1, gState.clubOnState);
    }, [gState.clubOnState])

    // initial render
    useEffect(() => {
        try {
            const sessionState = isPersistedState(storageKey)
            if (sessionState) {
                setState(sessionState)
                return
            }
        } catch (error) {
            sessionStorage.clear();
        }

        setState(initialState)
        fetchTrendingTvs(1, gState.clubOnState)
    }, [gState.clubOnState])

    // load more
    useEffect(() => {
        if (!isLoadingMore) return;

        setLoadWidth(loadWidth + 10)
        fetchTrendingTvs(state.page + 1, gState.clubOnState)
        setIsLoadingMore(false);
        setScrollRight(true);

    }, [isLoadingMore, state.page, loadWidth, gState.clubOnState])

    // write to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem(storageKey, JSON.stringify(state))
        } catch (error) {
            // setError(true)
            sessionStorage.clear();
        }
    }, [state])

    return {state, loading, error, setIsLoadingMore, loadWidth, scrollRight, setScrollRight, tvCount}
}