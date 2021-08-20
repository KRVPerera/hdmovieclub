import React from 'react'
// import PropTypes from 'prop-types'

// styles
import {Wrapper, Content, Title} from "./TrendingBar.styles"
import {useTrendFetch} from "../../hooks/useTrendFetch";
import {IMAGE_BASE_URL, TV_POSTER_SIZE} from "../../config";
import Slide from "../Slide";
import Spinner from "../Spinner";
import Fab from '@material-ui/core/Fab';
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';
// import useWindowDimensions from "../utils";

const TrendingBar = () => {
    const {state, loading, error, setIsLoadingMore} = useTrendFetch();
    // const { _ , width } = useWindowDimensions();

    if (error) {
        return <div>Something went wrong...</div>
    }

    return (
        <>
            {loading && <Spinner/>}
            {!loading &&
            <Wrapper>
                {/*<Title>Trending Shows</Title>*/}
                <Content>
                    <Title>Trending Shows</Title>
                    {state.page < state.total_pages && !loading && (
                        <Fab color="primary" aria-label="add" position="left-center">
                            <DoubleArrowSharpIcon/>
                        </Fab>
                    )}
                    {
                        state.results.map(tv => (
                        <Slide
                            key={tv.id}
                            clickable
                            image={
                                tv.poster_path ?
                                    IMAGE_BASE_URL + TV_POSTER_SIZE + tv.poster_path : null
                            }
                            alt_message={tv.name}
                            tvId={tv.id}/>
                    ))}
                    {state.page < state.total_pages && !loading && (
                        // <Button text="Load More" callback={() => setIsLoadingMore(true)}/>

                        <Fab color="primary" aria-label="add" onClick={() => setIsLoadingMore(true)}>
                            <DoubleArrowSharpIcon/>
                        </Fab>
                    )}
                </Content>
            </Wrapper>
            }
        </>
    )
}

export default TrendingBar;