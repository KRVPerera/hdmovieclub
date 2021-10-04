import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";

export const useMovieFetch = movieId => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true)
                setError(false)

                const movie = await API.fetchMovie(movieId)
                const credits = await API.fetchCredits(movieId)

                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                )

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                })

                setLoading(false)

            } catch (error) {
                setError(true)
            }
        }

        try {
            const sessionState = isPersistedState("movie-" + movieId)
            if (sessionState) {
                setState(sessionState)
                setLoading(false)
                return
            }
        } catch (error) {
            sessionStorage.clear();
        }
        fetchMovie()
    }, [movieId])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem("movie-" + movieId, JSON.stringify(state))
    }, [movieId, state])

    return {state, loading, error}
}
