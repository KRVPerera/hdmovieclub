import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";

export const usePeopleFetch = person_id => {
    const [state, setState] = useState({})
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                setError(false)
                const person = await API.fetchPerson(person_id)
                setState({
                    person : person
                })
            } catch (error) {
                setError(true)
            }
        }

        const sessionState = isPersistedState(person_id)
        if (sessionState) {
            setState(sessionState)
            return
        }
        fetchPerson()
    }, [person_id])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem(person_id, JSON.stringify(state))
    }, [person_id, state])

    return {state, error}
}
