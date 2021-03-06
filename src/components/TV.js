import React from 'react'
import {useParams} from 'react-router-dom'

// Config
import {IMAGE_BASE_URL, POSTER_SIZE, SHARE_SIZE} from "../config"

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
import MetaDecorator from "./utils/MetaDecorator";
import SearchBar from "./SearchBar";

const TV = () => {
    const {tvId} = useParams()
    const {state: tv, loading, error, setSearchTerm, actorList} = useTVFetch(tvId)

    if (loading) return <Spinner/>
    if (error) return <div>Something went wrong...</div>
    if (!tv.name || !tv.actors) {
        sessionStorage.removeItem("tv-" + tvId);
        sessionStorage.clear();
        return (
            <>
                <BreadCrumb movieTitle={"Unknown"}/>
                <h1>Something went wrong...</h1>
            </>
        )
    }

    return (
        <>
            <MetaDecorator
                title={tv.name}
                description={tv.overview}
                type="tv"
                imagelink={`${IMAGE_BASE_URL}${SHARE_SIZE}${tv.poster_path}`}
            />
            <BreadCrumb movieTitle={tv.name}/>
            <TVInfo tv={tv}/>

            <SearchBar placeholderText="Search Actor" setSearchTerm={setSearchTerm}/>

            <Grid header='Actors'>
                {
                    actorList.map(actor => (
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