import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";

export const useMovieFetch = movieId => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [actorList, setActorList] = useState({})

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
                setActorList(sessionState.actors)
                setLoading(false)
                return
            }
        } catch (error) {
            sessionStorage.clear();
        }
        fetchMovie()
    }, [movieId])

    useEffect(() => {
        if (!state || !state.actors) {
            return
        }
        if (searchTerm === "") {
            setActorList(state.actors)
        } else {
            setActorList(state.actors.filter(
                actor => actor.name.toUpperCase().includes(searchTerm.toUpperCase())
            ))
        }
    }, [searchTerm, state])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem("movie-" + movieId, JSON.stringify(state))
    }, [movieId, state])

    return {state, loading, error, setSearchTerm, actorList}
}
