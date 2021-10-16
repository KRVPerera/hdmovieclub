import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedState} from "../helpers";

export const useMovieVideosFetch = movieId => {
    const [movieVideos, setMovieVideos] = useState({})
    const [loadingVideos, setLoadingVideos] = useState(true)
    const [errorVideos, setErrorVideos] = useState(false)

    useEffect(() => {
        const fetchMovieVideos = async () => {
            try {
                setLoadingVideos(true)
                setErrorVideos(false)

                const videos = await API.fetchMovieVideos(movieId)
                // videos.results = videos.results.filter(data => data.site === 'YouTube' && (data.type === 'Trailer' || data.type === 'Teaser'))
                videos.results = videos.results.filter(data => data.site === 'YouTube' && data.type === 'Trailer')
                setMovieVideos(videos.results)
                setLoadingVideos(false)

            } catch (error) {
                setErrorVideos(true)
            }
        }

        try {
            const videos = isPersistedState("movieVideos-" + movieId)
            if (videos) {
                setMovieVideos(videos)
                setLoadingVideos(false)
                return
            }
        } catch (error) {
            sessionStorage.clear();
        }
        fetchMovieVideos()
    }, [movieId])

    // write to session storage
    useEffect(() => {
        sessionStorage.setItem("movieVideos-" + movieId, JSON.stringify(movieVideos))
    }, [movieId, movieVideos])

    return {movieVideos, loadingVideos, errorVideos}
}
