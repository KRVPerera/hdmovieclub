import React from 'react'
import PropTypes from 'prop-types'

// Components
import Thumb from '../Thumb'

// Config
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config"

// Image
import NoImage from '../../images/no_image.jpg'

// Styles
import {Wrapper, Content, Text} from './TVInfo.styles'
import Chip from "@material-ui/core/Chip";
import IMDBMovie from "../IMDBMovie";

const TVInfo = ({tv}) => {

    let date = new Date(tv.first_air_date);
    let longDate = date.toLocaleString('en-us', {day: 'numeric', year: 'numeric', month: 'short'});
    let tvYear = date.toLocaleString('en-us', {year: 'numeric'});

    return (
        <Wrapper backdrop={tv.backdrop_path}>
            <Content>
                <Thumb
                    image={
                        tv.poster_path ?
                            `${IMAGE_BASE_URL}${POSTER_SIZE}${tv.poster_path}`
                            : NoImage
                    }
                    clickable={false}
                />
                <Text>
                    <h1>{tv.name} ({tvYear})</h1>
                    <Chip
                        key="tv.type"
                        color="primary"
                        label={tv.type}
                        className="chip chip-type"
                        size="small"
                    />
                    {tv.genres && tv.genres.sort().map(genre => (
                        <Chip
                            key={genre.id}
                            label={genre.name}
                            className="chip"
                            size="small"
                        />
                    ))}
                    <h3>{tv.tagline}</h3>
                    <p>{tv.overview}</p>
                    <div className="rating-directors">
                        <div className="item">
                            <h3>RATING</h3>
                            <div className="score">{tv.vote_average*10}%</div>
                        </div>

                        {tv.created_by.length > 0 && <div className="director item">
                            <h3>DIRECTOR{tv.created_by.length > 1 ? 'S' : ''}</h3>
                            {tv.created_by.map(
                                director => (
                                    <p key={director.credit_id}>{director.name}</p>
                                ))
                            }
                            <p>{tv.created_by.name}</p>
                        </div>
                        }

                        <div className="item">
                            <h3>STATUS</h3>
                            <div>{tv.status}</div>
                        </div>

                        <div className="item">
                            <h3>RUNTIME</h3>
                            <div>{tv.number_of_seasons} seasons / {tv.number_of_episodes} episodes</div>
                        </div>

                        {longDate > 0 &&
                            <div className="item">
                                <h3>FIRST AIR DATE</h3>
                                <div>{longDate}</div>
                            </div>
                        }
                    </div>
                    {tv.imdb_id && <IMDBMovie movie={tv}/>}
                </Text>
            </Content>
        </Wrapper>
    )
}

//
TVInfo.propTypes = {
    tv: PropTypes.object
}

export default TVInfo

