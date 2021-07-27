import React from 'react'
import PropTypes from 'prop-types'

// Styles
import {Wrapper, Image} from './Actor.styles'

const Actor = ({name, character, imageURL}) => (
    <Wrapper>
        <Image src={imageURL} alt={name} />
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
)

Actor.propTypes = {
    name: PropTypes.string,
    character: PropTypes.string,
    imageURL: PropTypes.string
}

export default Actor