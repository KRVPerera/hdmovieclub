import React from 'react'
import {useParams} from 'react-router-dom'

// Components
import BreadCrumb from "./BreadCrumb";
import TVInfo from "./TVInfo";
import Spinner from "./Spinner"

// Hook
import {useTVFetch} from "../hooks/useTVFetch";

const TV = () => {
    const {tvId} = useParams()
    const {state: tv, loading, error} = useTVFetch(tvId)

    if (loading) return <Spinner/>
    if (error) return <div>Something went wrong...</div>

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
            {/*<Grid header='Actors'>*/}
            {/*    {tv.actors.map(actor => (*/}
            {/*        <Actor*/}
            {/*            key={actor.credit_id}*/}
            {/*            name={actor.name}*/}
            {/*            character={actor.character}*/}
            {/*            imageURL={*/}
            {/*                actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage*/}
            {/*            }*/}
            {/*        />*/}
            {/*    ))}*/}
            {/*</Grid>*/}
        </>
    )
}

export default TV