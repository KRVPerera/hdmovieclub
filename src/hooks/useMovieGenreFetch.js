import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedStateInLocal} from "../helpers";

const storageKey = "movieGenres"

const initialState = {
    genres : []
}

export const useMovieGenreFetch = () => {
    const [state, setState] = useState(initialState)
    const [error, setError] = useState(false)

    const fetchMovieGenres = async () => {
        try {
            setError(false)
            const movieGenres = await API.fetchMovieGenres()
            setState({
                genres : movieGenres.genres
            })

        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        const itemStr = isPersistedStateInLocal(storageKey)
        if (itemStr) {
            const now = new Date()
            if (now.getTime() > itemStr.expiry) {
                sessionStorage.removeItem(storageKey)
                return
            }
            setState(itemStr.value)
            return
        }
        fetchMovieGenres()
    }, [])

    // write to session storage
    useEffect(() => {
        const now = new Date()

        // 10 minute expire
        const item = {
            value: state,
            expiry: now.getTime() + 600000,
        }
        localStorage.setItem(storageKey, JSON.stringify(item))
    }, [state])

    return {state, error}
}
