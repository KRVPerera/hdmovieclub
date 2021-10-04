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

export const useTrendFetch = (clubOnState) => {
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
                setState(prevState => ({
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
        fetchTrendingTvs(1, clubOnState);
    }, [clubOnState])

    // initial render and search
    useEffect(() => {
        const sessionState = isPersistedState(storageKey)
        if (sessionState) {
            setState(sessionState)
            return
        }

        setState(initialState)
        fetchTrendingTvs(1, clubOnState)
    }, [clubOnState])

    // load more
    useEffect(() => {
        if (!isLoadingMore) return;

        setLoadWidth(loadWidth + 10)
        fetchTrendingTvs(state.page + 1, clubOnState)
        // setScroll(scroll + document.documentElement.scrollHeight + 200)
        setIsLoadingMore(false);
        setScrollRight(true);

    }, [isLoadingMore, state.page, loadWidth, clubOnState])

    // write to sessionStorage
    useEffect(() => {
        try {
            sessionStorage.setItem(storageKey, JSON.stringify(state))
        } catch (error) {
            // setError(true)
            sessionStorage.clear();
        }
    }, [state, clubOnState])

    return {state, loading, error, setIsLoadingMore, loadWidth, scrollRight, setScrollRight, tvCount}
}