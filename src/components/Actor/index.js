import React from 'react'
import PropTypes from 'prop-types'

// Styles
import {Wrapper, Image} from './Actor.styles'
import {usePeopleFetch} from "../../hooks/usePeopleFetch";

const Actor = ({actor, person_id, name, imageURL}) => {

    const {state: person, error} = usePeopleFetch(person_id)

    let actorName;
    if (person.person && person.person.imdb_id) {
        actorName = <a rel="noreferrer" href={"https://www.imdb.com/name/" + person.person.imdb_id} target="_blank">
            <h3>{name}</h3></a>;
    } else {
        actorName = <h3>{name}</h3>;
    }

    let character;
    if (actor.character) {
        character = <p>{actor.character}</p>
    } else {
        let characters = "";
        actor.roles && actor.roles.map((role, index) => (
            characters = characters.concat((index>0?", ":""), role.character)
        ))
        character = <p>{characters}</p>
    }

    return (
        <Wrapper>
            <Image src={imageURL} alt={name} loading="lazy"/>
            {actorName}
            {character}
            {!error && person.person && person.person.birthday &&
            <p>DOB: {person.person.birthday}</p>
            }
        </Wrapper>
    )
}

Actor.propTypes = {
    actor: PropTypes.object.isRequired,
    person_id: PropTypes.number.isRequired,
    name: PropTypes.string,
    imageURL: PropTypes.string
}

export default Actor