import PropTypes from 'prop-types'

// Components
import Thumb from '../Thumb'
import IMDBMovie from '../IMDBMovie'

// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config"

// Image
import NoImage from '../../images/no_image.jpg'

// Styles
import {Wrapper, Content, Text} from './MovieInfo.styles'
import React from "react";
import Chip from "@material-ui/core/Chip";

const MovieInfo = ({movie}) => {

    let date = new Date(movie.release_date);
    let longMonth = date.toLocaleString('en-us', {day: 'numeric', year: 'numeric', month: 'short'});
    let movieYear = date.toLocaleString('en-us', {year: 'numeric'});

    let runtime = new Date(movie.runtime);
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;

    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb
                    image={
                        movie.poster_path ?
                            `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                    }
                    clickable={false}
                />
                <Text>
                    <h1>{movie.title} ({movieYear})</h1>
                    <Chip
                        key="tv.type"
                        color="primary"
                        label={movie.status}
                        className="chip chip-type"
                        size="small"
                    />
                    {movie.genres && movie.genres.sort().map(genre => (
                        <Chip
                            key={genre.id}
                            label={genre.name}
                            className="chip"
                            size="small"
                        />
                    ))}
                    <h3>{movie.tagline}</h3>
                    <h4>{movie.overview}</h4>

                    <div className="rating-directors">
                        <div className="item">
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average * 10}%</div>
                        </div>

                        {movie.directors &&
                            <div className="director item">
                                <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                                {movie.directors.map(
                                    director => (
                                        <p key={director.credit_id}>{director.name}</p>
                                    ))
                                }
                            </div>
                        }

                        <div className="item">
                            <h3>RELEASE DATE</h3>
                            <div>{longMonth}</div>
                        </div>

                        {movie.runtime > 0 &&
                        <div className="item">
                            <h3>RUNTIME</h3>
                            <div>{hours}h {minutes}m</div>
                        </div>
                        }
                    </div>
                    {movie.imdb_id && <IMDBMovie movie={movie}/>}
                </Text>
            </Content>
        </Wrapper>
    )
}


MovieInfo.propTypes = {
    movie: PropTypes.object
}

export default MovieInfo

