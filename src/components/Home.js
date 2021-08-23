// Config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from "../config"

// Components
import Spinner from "./Spinner"
import Chip from "@material-ui/core/Chip";
import React from "react";
import HeroImage from "./HeroImage"
import Grid from "./Grid"
import Thumb from "./Thumb"
import SearchBar from "./SearchBar"
import Button from "./Button"
import TrendingBar from "./TrendingBar";

// Hook
import {useHomeFetch} from '../hooks/useHomeFetch'
import {useMovieGenreFetch} from "../hooks/useMovieGenreFetch";

const Home = () => {
    const {state: genres, error2} = useMovieGenreFetch()
    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore} = useHomeFetch();

    const genreMap = genres.genres.reduce(function (result, currentObject) {
        result[currentObject.id] = currentObject.name;
        return result;
    }, {});

    if (error) {
        return <div>Something went wrong...</div>
    }

    return (
        <>
            {!searchTerm && state.results[0] && <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title={state.results[0].original_title}
                text={state.results[0].overview}
            />}
            {!searchTerm && <TrendingBar/>}
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? 'Search Result' : 'Popular movies'}>
                {state.results.map((movie, idx) => (
                    <Thumb
                        key={movie.id}
                        clickable
                        image={
                            movie.poster_path ?
                                IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : null
                        }
                        alt_message={movie.title}
                        movieId={movie.id}
                    >
                        {!error2 && movie.genre_ids && movie.genre_ids.sort().map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genreMap[genre]}
                                className="chip"
                                size="small"
                                variant="outlined"
                            />
                        ))}

                    </Thumb>
                ))}
            </Grid>
            {loading && <Spinner/>}
            {state.page < state.total_pages && !loading && (
                <Button text="Load More" callback={() => setIsLoadingMore(true)}/>
            )}
        </>
    )
}

export default Home