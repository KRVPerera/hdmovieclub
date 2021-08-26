import React from 'react'
import {useParams} from 'react-router-dom'

// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from "../config"

// Components
import Grid from "./Grid";
import BreadCrumb from "./BreadCrumb";
import TVInfo from "./TVInfo";
import Spinner from "./Spinner"
import Actor from "./Actor"

// Hook
import {useTVFetch} from "../hooks/useTVFetch";

// Image
import NoImage from '../images/no_image.jpg'

const TV = () => {
    const {tvId} = useParams()
    const {state: tv, loading, error} = useTVFetch(tvId)

    if (loading) return <Spinner/>
    if (error) return <div>Something went wrong...</div>
    if (!tv.name || !tv.actors) {
        sessionStorage.removeItem("tv-" + tvId);
        return <h1>Something went wrong...</h1>
    }

    return (
        <>
            <BreadCrumb movieTitle={tv.name}/>
            <TVInfo tv={tv}/>

            {/*{tv.seasons.map(season => (*/}
            {/*    <p>{season.overview}</p>*/}
            {/*))}*/}
            {/*<MovieInfoBar*/}
            {/*    time={movie.runtime}*/}
            {/*    budget={movie.budget}*/}
            {/*    revenue={movie.revenue}*/}
            {/*/>*/}
            <Grid header='Actors'>
                {tv.actors.map(actor => (
                    <Actor
                        key={actor.id}
                        actor={actor}
                        name={actor.name}
                        person_id={actor.id}
                        character={actor.character}
                        imageURL={
                            actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage
                        }
                    />
                ))}
            </Grid>
        </>
    )
}

export default TV