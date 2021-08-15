import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

// styles
import {Wrapper, Image} from './Slide.styles'

// TODO: add hover items, release date like things

const Slide = ({image, alt_message, tvId, clickable}) => (
    <>
        {clickable ? (
            <Link to={`/tv/${tvId}`}>
                <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
            </Link>
        ) : (
            <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
        )}
    </>
)

Slide.propTypes = {
    // image: PropTypes.string,
    // alt_message: PropTypes.string,
    // tvId: PropTypes.number,
    // clickable: PropTypes.bool
}

export default Slide;