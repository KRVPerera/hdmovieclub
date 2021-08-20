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

const TVInfo = ({tv}) => {

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
                    <h1>{tv.title}</h1>
                    <h3>PLOT</h3>
                    <p>{tv.overview}</p>

                    <div className="rating-directors">
                        <div className="item">
                            <h3>RATING</h3>
                            <div className="score">{tv.vote_average}</div>
                        </div>

                        {tv.created_by && <div className="director item">
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
                    </div>
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

