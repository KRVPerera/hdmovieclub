// Config
import {POSTER_SIZE, IMAGE_BASE_URL} from "../config"

// Components
import React, {useContext} from 'react';
import Spinner from "./Spinner"
import Chip from "@material-ui/core/Chip";
import Avatar from '@material-ui/core/Avatar';

// my components
import HeroImage from "./HeroImage"
import Grid from "./Grid"
import Thumb from "./Thumb"
import SearchBar from "./SearchBar"
import Button from "./Button"
import TrendingBar from "./TrendingBar";

// Hook
import {useHomeFetch} from '../hooks/useHomeFetch'
import {useMovieGenreFetch} from "../hooks/useMovieGenreFetch";

// Context
import {Context} from '../Store'

const Home = () => {
    const [gState] = useContext(Context)
    const {state: genres, error2} = useMovieGenreFetch()
    const {state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore, movieCount} = useHomeFetch();

    const genreMap = genres.genres.reduce(function (result, currentObject) {
        result[currentObject.id] = currentObject.name;
        return result;
    }, {});

    if (error) {
        return <div>Something went wrong...</div>
    }
    return (
        <>
            {!searchTerm && state.results[0] &&
            <HeroImage
                movie={state.results[0]}
            />
            }
            {!searchTerm && <TrendingBar />}
            <SearchBar setSearchTerm={setSearchTerm} placeholderText="Search Movies"/>
            <Grid
                header={searchTerm ? 'Search Result' : gState.clubOnState ? `HD Movie Club Movies : ${movieCount}` : 'Popular movies'}>
                {state.results.map((movie) => (
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
                        <Chip
                            key="movie_date"
                            label={new Date(movie.release_date).toLocaleString('en-us', {year: 'numeric'})}
                            className="chip"
                            size="small"
                            color="primary"
                            avatar={<Avatar>Y</Avatar>}
                        />
                        <Chip
                            key="ratings"
                            label={`${movie.vote_average * 10}%`}
                            className="chip"
                            size="small"
                            color="primary"
                            avatar={<Avatar>R</Avatar>}
                        />
                        {!error2 && movie.genre_ids && movie.genre_ids.filter((value, index, a) =>
                            a.indexOf(value) === index
                        ).sort().map((genre) => (
                            <Chip
                                key={genre.id}
                                label={genreMap[genre]}
                                color="primary"
                                className="chip"
                                size="small"
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