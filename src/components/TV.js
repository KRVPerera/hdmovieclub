import React from 'react'
import {useParams} from 'react-router-dom'

// Config
import {IMAGE_BASE_URL, TV_POSTER_SIZE, POSTER_SIZE} from "../config"

// Components
import BreadCrumb from "./BreadCrumb";
import TVInfo from "./TVInfo";
import Spinner from "./Spinner"
import Thumb from "./Thumb";

// Hook
import {useTVFetch} from "../hooks/useTVFetch";

// Image
import NoImage from '../images/no_image.jpg'

const TV = () => {
    const {tvId} = useParams()
    const {state: tv, loading, error} = useTVFetch(tvId)

    if (loading) return <Spinner/>
    if (error) return <div>Something went wrong...</div>

    return (
        <>
            <BreadCrumb movieTitle={tv.name}/>
            <TVInfo tv={tv}/>
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