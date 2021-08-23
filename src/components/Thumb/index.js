import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// styles
import {Wrapper, Image} from './Thumb.styles'

const Thumb = ({image, alt_message, movieId, clickable, children}) => {
    return (
        <Wrapper>
            {clickable ? (
                <Link to={`/movie/${movieId}`}>
                    <Image loading="lazy" src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
                </Link>
            ) : (
                <Image loading="lazy" src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
            )}
            {children}
        </Wrapper>
    )
}

Thumb.propTypes = {
    image: PropTypes.string,
    alt_message: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
}

export default Thumb;