import React from 'react'
import PropTypes from 'prop-types'

// styles
import {Wrapper, Content, Text} from "./HeroImage.styles"
import HdMovieClubImage from "../../images/hdmovieclub.jpg";
import {BACKDROP_SIZE, IMAGE_BASE_URL} from "../../config";

const HeroImage = ({movie, clubOnState}) => {

    let image, title, text;
    if (clubOnState) {
        image = HdMovieClubImage;
        title = "HD Movie Club"
        text = "A pre selected content list"
    } else {
        image = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`;
        title = movie.original_title;
        text = movie.overview
    }

    return (
    <Wrapper image={image}>
        <Content>
            <Text>
                <h1>{title}</h1>
                <p>{text}</p>
            </Text>
        </Content>
    </Wrapper>
)
}

HeroImage.propTypes = {
    movie: PropTypes.object,
    clubOnState: PropTypes.bool,
}

export default HeroImage;