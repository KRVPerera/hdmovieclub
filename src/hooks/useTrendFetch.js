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

const storageKey = "trendingMoviesState"
const storageHDMovieClubKey = "hdMovieClubTrendFetch"

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
            let itemStr;
            if (!gState.clubOnState) {
                itemStr = isPersistedState(storageKey)
            } else {
                itemStr = isPersistedStateInLocal(storageHDMovieClubKey)
            }
            if (itemStr) {
                const now = new Date()
                if (now.getTime() > itemStr.expiry) {
                    if (!gState.clubOnState) {
                        sessionStorage.removeItem(storageKey)
                    } else {
                        localStorage.removeItem(storageHDMovieClubKey)
                    }
                } else {
                    const sessionState = itemStr.value
                    setState(sessionState)
                    return
                }
            }
        } catch (error) {
            sessionStorage.removeItem(storageKey);
            localStorage.removeItem(storageHDMovieClubKey);
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
            const item = {
                value: state,
                expiry: getExpiryTime(gState.clubOnState, 30),
            }
            if (!gState.clubOnState) {
                sessionStorage.setItem(storageKey, JSON.stringify(item))
            } else {
                localStorage.setItem(storageHDMovieClubKey, JSON.stringify(item))
            }
        } catch (error) {
            sessionStorage.removeItem(storageKey);
            localStorage.removeItem(storageHDMovieClubKey);
        }
    }, [state, gState.clubOnState])

    return {state, loading, error, setIsLoadingMore, loadWidth, scrollRight, setScrollRight, tvCount}
}