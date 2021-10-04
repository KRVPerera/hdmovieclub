import React, {useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'

// import PropTypes from 'prop-types'

// styles
import {Wrapper, Content, Title, SlideBar, TwoButtons} from "./TrendingBar.styles"

// hooks
import {useTrendFetch} from "../../hooks/useTrendFetch";

// config
import {IMAGE_BASE_URL, TV_POSTER_SIZE} from "../../config";

// components
import Slide from "../Slide";
import Spinner from "../Spinner";
import Fab from '@material-ui/core/Fab';

// Icons
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';
import TvIcon from '@material-ui/icons/Tv';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';

const TrendingBar = ({clubOnState}) => {
    const {state, loading, error, setIsLoadingMore, loadWidth, scrollRight, setScrollRight, tvCount} = useTrendFetch(clubOnState);

    const navRef = useRef(null);

    useEffect(() => {
        // navRef.current.scrollLeft += 10;
        if (!scrollRight) return;

        navRef.current.scrollLeft += (loadWidth + 1) * 150;
        setScrollRight(false)
    }, [scrollRight, loadWidth, setScrollRight]);

    if (error) {
        return <div>Something went wrong...</div>
    }

    return (
        <>
            {state.page === 0 && <Spinner/>}
            {<Wrapper>
                <Content>
                    <Title>{clubOnState? `HD Movie Club Shows : ${tvCount}` : "Trending Shows"}</Title>
                    <SlideBar ref={navRef}>
                        {!loading && (
                            <Fab size="small" variant="circular" color='inherit' aria-label="end"
                                 className="TrendBarFab TrendBarFabLeft"
                                 onClick={() => setScrollRight(true)}>
                                <DoubleArrowSharpIcon/>
                            </Fab>
                        )}
                        {
                            state.results.filter((tv, i) => i < loadWidth).map(tv => (
                                <Slide
                                    key={tv.id}
                                    clickable
                                    image={
                                        tv.poster_path ?
                                            IMAGE_BASE_URL + TV_POSTER_SIZE + tv.poster_path : null
                                    }
                                    alt_message={tv.name}
                                    tvId={tv.id}/>
                            ))

                        }
                        {/*{state.page < state.total_pages && !loading && (*/}
                        {!loading && (
                            <TwoButtons>
                                <Fab variant="circular" color='inherit' aria-label="more"
                                     onClick={() => setIsLoadingMore(true)} className="TrendBarFab TrendBarFabRight">
                                    <QueuePlayNextIcon/>
                                </Fab>
                                <Link to={`/`}>
                                    <Fab variant="circular" color='inherit' aria-label="tvs"
                                         className="TrendBarFab TrendBarFabRight TrendBarFabRightTVS">
                                        <TvIcon/>
                                    </Fab>
                                </Link>
                            </TwoButtons>
                        )}
                    </SlideBar>

                </Content>
            </Wrapper>
            }
        </>
    )
}

export default TrendingBar;