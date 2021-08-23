import PropTypes from 'prop-types'

// Styles
import {Wrapper, Content, Text} from './IMDBMovie.styles'
import React from "react";
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';


const IMDBMovie = ({movie}) => {

    let movieTitle;
    if (movie.imdb_id) {
        movieTitle = <a rel="noreferrer" href={"https://www.imdb.com/title/" + movie.imdb_id} target="_blank">{movie.title}</a>;
    } else {
        movieTitle = <h1>{movie.title}</h1>;
    }
    let imdbRating = <a rel="noreferrer" href={"https://www.imdb.com/title/" + movie.imdb_id + "/ratings"} target="_blank"><ThumbsUpDownIcon/></a>;

    return (
        <Wrapper>
            <Content>
                <h3>IMDB Links</h3>
                <Text>
                    <p>
                        Movie : {movieTitle}
                    </p>
                    <p>
                        Ratings : {imdbRating}
                    </p>
                </Text>
            </Content>
        </Wrapper>
    )
}

IMDBMovie.propTypes = {
    movie: PropTypes.object,
}

export default IMDBMovie