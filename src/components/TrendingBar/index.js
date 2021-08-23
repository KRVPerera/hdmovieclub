import React, {useState, useEffect, useRef} from 'react'
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
import DoubleArrowSharpIcon from '@material-ui/icons/DoubleArrowSharp';
import TvIcon from '@material-ui/icons/Tv';

const TrendingBar = () => {
    const prevScrollLeft = useRef(0);
    const {state, loading, error, setIsLoadingMore} = useTrendFetch();
    const [scroll, setScroll] = useState(0);
    // const [goingLeft, setGoingLeft] = useState(false);

    const navRef = useRef(null);

    useEffect(() => {
        // var maxScrollLeft = element.scrollWidth - element.clientWidth;
        prevScrollLeft.current = navRef.current.scrollLeft;
        navRef.current.scrollLeft += scroll;
    }, [scroll]);

    //
    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollLeft = navRef.current.scrollLeft;
    //         if (prevScrollLeft.current < currentScrollLeft && goingLeft) {
    //             setGoingLeft(false);
    //         }
    //         if (prevScrollLeft.current > currentScrollLeft && !goingLeft) {
    //             setGoingLeft(true);
    //         }
    //
    //         prevScrollLeft.current = currentScrollLeft;
    //     };
    //
    //     window.addEventListener("scroll", handleScroll, { passive: true });
    //
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [goingLeft]);

    if (error) {
        return <div>Something went wrong...</div>
    }

    return (
        <>
            {loading && <Spinner/>}
            {!loading &&
            <Wrapper>
                <Content>
                    <Title>Trending Shows</Title>
                    <SlideBar ref={navRef}>
                        {!loading && (
                            <Fab size="small" variant="circular" color='inherit' aria-label="end"
                                 className="TrendBarFab TrendBarFabLeft" onClick={() => setScroll(scroll + 200)}>
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
                            <TwoButtons>
                                <Fab variant="circular" color='inherit' aria-label="more"
                                     onClick={() => setIsLoadingMore(true)} className="TrendBarFab TrendBarFabRight">
                                    <DoubleArrowSharpIcon/>
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