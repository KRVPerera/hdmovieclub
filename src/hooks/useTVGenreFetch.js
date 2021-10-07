import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";
import {getExpiryTime} from "../utils/utils"

const storageKey = "tvGenres"

const initialState = {
    genres : []
}

export const useTVGenreFetch = () => {
    const [state, setState] = useState(initialState)
    const [error, setError] = useState(false)

    const fetchTVGenres = async () => {
        try {
            setError(false)

            const tvGenres = await API.fetchTVGenres()

            setState({
                genres : tvGenres.genres
            })

        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        const sessionState = isPersistedState(storageKey)
        if (sessionState) {
            setState(sessionState)
            return
        }
        fetchTVGenres()
    }, [])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem(storageKey, JSON.stringify(state))
    }, [state])

    return {state, error}
}
