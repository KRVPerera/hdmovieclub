import React from 'react'
import PropTypes from 'prop-types'

// Styles
import {Wrapper, Image} from './Actor.styles'
import {usePeopleFetch} from "../../hooks/usePeopleFetch";

const Actor = ({person_id, name, character, imageURL}) => {

    const {state: person, error} = usePeopleFetch(person_id)

    let actorName;
    if (person.person && person.person.imdb_id) {
        actorName = <a rel="noreferrer" href={"https://www.imdb.com/name/" + person.person.imdb_id} target="_blank"><h3>{name}</h3></a>;
    } else {
        actorName = <h3>{name}</h3>;
    }
    return (
        <Wrapper>
            <Image src={imageURL} alt={name} loading="lazy"/>
            {actorName}
            <p>{character}</p>
            {!error && person.person && person.person.birthday &&
            <p>DOB: {person.person.birthday}</p>
            }
        </Wrapper>
    )
}

Actor.propTypes = {
    person_id: PropTypes.number,
    name: PropTypes.string,
    character: PropTypes.string,
    imageURL: PropTypes.string
}

export default Actor