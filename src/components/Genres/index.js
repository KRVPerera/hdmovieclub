import React from 'react'

import Chip from '@material-ui/core/Chip';

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

export default Genre;