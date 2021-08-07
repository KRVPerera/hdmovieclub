import React, {useContext} from 'react'
import API from "../../API"
import PropTypes from 'prop-types'

// Components
import Thumb from '../Thumb'

// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config"

// Image
import NoImage from '../../images/no_image.jpg'

// Styles
import {Wrapper, Content, Text} from './MovieInfo.styles'

const MovieInfo = ({movie}) => {

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
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div className="column">
                            <h3>RATING</h3>
                            <div className="score">{movie.vote_average}</div>
                        </div>

                        <div className="director column">
                            <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                            {movie.directors.map(
                                director => (
                                    <p key={director.credit_id}>{director.name}</p>
                                ))
                            }
                        </div>

                        <div className="date column">
                            <h3>RELEASED</h3>
                            <div>{movie.release_date}</div>
                        </div>

                        <div className="date column">
                            <h3>RUNTIME</h3>
                            <div>{movie.runtime && movie.runtime} minutes</div>
                        </div>
                    </div>
                </Text>
            </Content>
        </Wrapper>
    )
}


MovieInfo.propTypes = {
    movies: PropTypes.object
}

export default MovieInfo

