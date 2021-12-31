import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";

export const useTVFetch = tvId => {
    const [state, setState] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [actorList, setActorList] = useState({})

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

        try {
            const sessionState = isPersistedState("tv-" + tvId)
            if (sessionState) {
                setState(sessionState)
                setActorList(sessionState.actors)
                setLoading(false)
                return
            }
        } catch (error) {
          sessionStorage.clear();
        }
        fetchTV()
    }, [tvId])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem("tv-" + tvId, JSON.stringify(state))
    }, [tvId, state])

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

    return {state, loading, error, setSearchTerm, actorList}
}
