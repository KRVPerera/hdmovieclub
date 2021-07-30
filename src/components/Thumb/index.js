import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// styles
import {Image} from './Thumb.styles'

// TODO: add hover items, release date like things

const Thumb = ({image, alt_message, movieId, clickable}) => (
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
            </Link>
        ) : (
            <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
        )}
    </div>
)

Thumb.propTypes = {
    image: PropTypes.string,
    alt_message: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
}

export default Thumb;