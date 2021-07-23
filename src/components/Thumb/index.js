import React from 'react'

// styles
import {Image} from './Thumb.styles';

const Thumb = ({image, alt_message, movieId, clickable }) => (
    <div>
        <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"} />
    </div>
)

export default Thumb;