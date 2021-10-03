import React from 'react'
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";


// Config
import {IMAGE_BASE_URL, POSTER_SIZE, SHARE_SIZE} from "../config"

// Components
import Grid from "./Grid";
import Spinner from "./Spinner"
import BreadCrumb from './BreadCrumb'
import MovieInfo from "./MovieInfo"
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor"

// Hook
import {useMovieFetch} from "../hooks/useMovieFetch";

// Image
import NoImage from '../images/no_image.jpg'
import MetaDecorator from "./utils/MetaDecorator";

const Movie = () => {
    const {movieId} = useParams()
    const {state: movie, loading, error} = useMovieFetch(movieId)

    if (loading) return <Spinner/>
    if (error) return <div>Something went wrong...</div>
    if (!movie.title || !movie.actors) {
        sessionStorage.removeItem("movie-" + movieId);
        return <h1>Something went wrong...</h1>
    }

    return (
        <>
            <MetaDecorator
                title={movie.title}
                description={movie.overview}
                type={movie}
                imagelink={`${IMAGE_BASE_URL}${SHARE_SIZE}${movie.poster_path}`}
            />
            <BreadCrumb movieTitle={movie.title}/>
            <MovieInfo movie={movie}/>
            <MovieInfoBar
                time={movie.runtime}
                budget={movie.budget}
                revenue={movie.revenue}
            />
            <Grid header='Actors'>
                {movie.actors && movie.actors.map(actor => (
                    <Actor
                        key={actor.id}
                        actor={actor}
                        person_id={actor.id}
                        name={actor.name}
                        imageURL={
                            actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    )
}
export default Movie