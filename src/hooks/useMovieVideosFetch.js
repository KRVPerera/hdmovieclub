import {useState, useEffect} from "react"
import API from "../API"

// Helpers
import {isPersistedStateInLocal} from "../helpers";

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
                videos.results = videos.results.filter(data => data.site === 'YouTube' && data.type === 'Trailer')
                setMovieVideos(videos.results)
                setLoadingVideos(false)

            } catch (error) {
                setErrorVideos(true)
            }
        }

        try {
            // const videos = isPersistedState("movieVideos-" + movieId)
            const videos = isPersistedStateInLocal("movieVideos-" + movieId)
            if (videos) {
                setMovieVideos(videos)
                console.log(videos)
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
        localStorage.setItem("movieVideos-" + movieId, JSON.stringify(movieVideos))
        // sessionStorage.setItem("movieVideos-" + movieId, JSON.stringify(movieVideos))
    }, [movieId, movieVideos])

    return {movieVideos, loadingVideos, errorVideos}
}
