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
            setState(itemStr)
            return
        }
        fetchMovieGenres()
    }, [])

    // write to session storage
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(state))
    }, [state])

    return {state, error}
}
