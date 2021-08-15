import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedStateInLocal} from "../helpers";

const storageKey = "movieGenres"

export const useMovieGenreFetch = () => {
    const [state, setState] = useState({})
    const [error, setError] = useState(false)

    const fetchMovieGenres = async () => {
        try {
            setError(false)

            const movieGenres = await API.fetchMovieGenres()

            console.log(movieGenres)

            setState({
                ...movieGenres,
            })

        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        const sessionState = isPersistedStateInLocal(storageKey)
        if (sessionState) {
            setState(sessionState)
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
