import React from 'react'
import {Link} from 'react-router-dom'

// styles
import {Image} from './Thumb.styles'

const Thumb = ({image, alt_message, movieId, clickable }) => (
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"} />
            </Link>
        ) : (
            <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"} />
        )}
    </div>
)

export default Thumb;