import React from 'react'
import PropTypes from 'prop-types'

// styles
import {Wrapper, Content, Title} from "./TrendingBar.styles"
import {useTrendFetch} from "../../hooks/useTrendFetch";
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../config";
import Slide from "../Slide";
import Spinner from "../Spinner";
import Button from "../Button";

const TrendingBar = () => {
    const {state, loading, error, setIsLoadingMore} = useTrendFetch();

    if (error) {
        return <div>Something went wrong...</div>
    }

    return (
        <>
            {loading && <Spinner/>}
            <Title>Trending Shows</Title>
            <Wrapper>
                <Content>
                    {state.results.map(tv => (
                        <Slide
                            key={tv.id}
                            clickable
                            image={
                                tv.poster_path ?
                                    IMAGE_BASE_URL + POSTER_SIZE + tv.poster_path : null
                            }
                            alt_message={tv.name}
                            tvId={tv.id}/>
                    ))}
                </Content>
            </Wrapper>
            {state.page < state.total_pages && !loading && (
                <Button text="Load More" callback={() => setIsLoadingMore(true)}/>
            )}
        </>
    )
}

export default TrendingBar;