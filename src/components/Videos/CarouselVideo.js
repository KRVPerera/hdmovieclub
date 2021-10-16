import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import React from 'react';
import ReactPlayer from 'react-player';
import {Carousel} from 'react-responsive-carousel';
import {PropTypes} from 'prop-types';
import {Grid, makeStyles} from '@material-ui/core';
import Spinner from "../Spinner"
// import Grid from "../Grid";
import {Wrapper, Content, PlayerWrapper} from "./CarouselVideo.styles"

const useStyles = makeStyles(theme => ({
    carousel: {
        margin: theme.spacing(2)
    }
}));

const YoutubeSlide = ({url, isSelected}) => (
    <PlayerWrapper>
        <ReactPlayer
            width='100%'
            url={url}
            playing={isSelected}
        />
    </PlayerWrapper>
);

const CarouselVideo = ({movieVideos, loadingVideos, errorVideos}) => {
    const classes = useStyles();
    if (loadingVideos) return <Spinner/>
    if (errorVideos) return <div>Something went wrong...</div>

    const getVideoThumb = videoId => `https://img.youtube.com/vi/${videoId}/default.jpg`;

    const videoUrl = "https://www.youtube.com/watch?v=";

    const customRenderThumb = children =>
        children.map(item => {
            const videoId = item.key;
            return <img key={videoId} src={getVideoThumb(videoId)} alt={item.name}/>;
        });

    return (
        <Wrapper>
            <Content>
                <Grid lg={8} md={8} sm={8} justifyContent={true} justify={true} item={true}>
                    <Carousel
                        autoPlay={false}
                        className={classes.carousel}
                        emulateTouch={true}
                        showArrows={true}
                        controls={true}
                        light={true}
                        showThumbs={true}
                        showStatus={false}
                        infiniteLoop={true}
                        renderThumbs={customRenderThumb}
                    >
                        {movieVideos.map(v => (
                            <YoutubeSlide
                                url={videoUrl + v.key}
                                muted
                                playing={false}
                                key={v.key}
                                size={v.size}
                                name={v.name}
                            />
                        ))}
                    </Carousel>
                </Grid>
            </Content>
        </Wrapper>
    );
};

YoutubeSlide.propTypes = {
    url: PropTypes.string,
    isSelected: PropTypes.bool
};

CarouselVideo.propTypes = {
    movieVideos: PropTypes.object,
    loadingVideos: PropTypes.bool,
    errorVideos: PropTypes.bool
};

// CarouselVideo.defaultProps = {
//     movieVideos: DUMMY_VIDEOS
// };

export default CarouselVideo;