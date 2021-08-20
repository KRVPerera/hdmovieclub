import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
// import Chip from '@material-ui/core/Chip';

// styles
import {Image} from './Thumb.styles'
// import {makeStyles} from "@material-ui/core/styles";
import {useMovieGenreFetch} from "../../hooks/useMovieGenreFetch";

// const useStyles = makeStyles((theme) => ({
//     chip: {
//         margin: theme.spacing(0.2),
//         float: "left",
//         fontSize: "0.8rem",
//         padding: 0,
//     },
// }));

const Thumb = ({image, alt_message, movieId, clickable, genre_ids}) => {

    const {state: genres, error} = useMovieGenreFetch()
    // const classes = useStyles();
    console.log(genres)

    // const validGenres = genres.genres.filter(genre =>
    //     // genre_ids.contains(genre.id)
    //     genre.id == "12"
    // )

    if (error) {
        return <div>Something went wrong...</div>
    }

    return (
        <div>
            {clickable ? (
                <Link to={`/${movieId}`}>
                    <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
                </Link>
            ) : (
                <Image src={image} alt={"Movie poster missing : '" + alt_message + "'"}/>
            )}
            {/*{genres && genre_ids && validGenres.map(genre => (*/}
            {/*    <Chip*/}
            {/*        key={genre.id}*/}
            {/*        label={genre.name}*/}
            {/*        className={classes.chip}*/}
            {/*    />*/}
            {/*))}*/}
        </div>
    )
}

Thumb.propTypes = {
    image: PropTypes.string,
    alt_message: PropTypes.string,
    movieId: PropTypes.number,
    clickable: PropTypes.bool
}

export default Thumb;