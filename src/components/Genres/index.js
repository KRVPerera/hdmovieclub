import React from 'react'

import Chip from '@material-ui/core/Chip';
import PropTypes from "prop-types";

const Genre = ({genres}) => (
    <>
        {genres.map(genre => (
            <Chip
                key={genre.id}
                label={genre.name}
            />
        ))}

    </>
)


Genre.propTypes = {
    genres: PropTypes.array
}
export default Genre;