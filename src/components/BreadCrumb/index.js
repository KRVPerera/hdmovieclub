import React from 'react'
import PropTypes from 'prop-types'

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import TheatersTwoToneIcon from '@material-ui/icons/TheatersTwoTone';

// Styles
import {Wrapper} from "./BreadCrumb.styles"


const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(1),
    },
}));

function handleClick(event) {
    // event.preventDefault();
}

const BreadCrumb = ({movieTitle}) => {
    const classes = useStyles();

    return (
        <Wrapper>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
                    <HomeIcon className={classes.icon}/>
                    Home
                </Link>
                <Typography color="textPrimary" className={classes.link}>
                    <TheatersTwoToneIcon className={classes.icon}/>
                    {movieTitle}
                </Typography>
            </Breadcrumbs>
        </Wrapper>
    );
}


BreadCrumb.propTypes = {
    movieTitle: PropTypes.string
}

export default BreadCrumb