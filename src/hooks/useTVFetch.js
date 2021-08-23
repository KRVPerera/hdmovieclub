import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";

export const useTVFetch = tvId => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchTV = async () => {
            try {
                setLoading(true)
                setError(false)

                const tv = await API.fetchTV(tvId)
                const credits = await API.fetchTVCredits(tvId)

                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                )

                setState({
                    ...tv,
                    actors: credits.cast,
                    directors
                })

                setLoading(false)

            } catch (error) {
                setError(true)
            }
        }

        const sessionState = isPersistedState("tv-" + tvId)
        if (sessionState) {
            setState(sessionState)
            setLoading(false)
            return
        }
        fetchTV()
    }, [tvId])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem("tv-" + tvId, JSON.stringify(state))
    }, [tvId, state])

    return {state, loading, error}
}
