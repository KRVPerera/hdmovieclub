import {Link} from 'react-router-dom';

// logos
import RMDBLogo from '../../images/react-movie-logo.svg'

import TMDBLogo from '../../images/tmdb_logo_p_short.svg'
// styles

import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import React from "react";

const Header = ({clubOnState, setClubOnState}) => {

    return (
        <header>
            <Wrapper>
                <Content>
                    <Link to='/'>
                        <LogoImg src={RMDBLogo} alt='rmdb-logo-image'/>
                    </Link>

                    <FormGroup row className="clubButton">
                        <FormControlLabel control={
                            <Switch
                                checked={clubOnState}
                                onChange={() => setClubOnState(!clubOnState)}
                                name="on"
                                color="primary"
                            />
                        }
                                          label={clubOnState ? "\tHD Movie club" : "\tAll Movies"}
                                          className={clubOnState ? "clubImage" : "noimage"}
                        />
                    </FormGroup>

                    <a href='https://www.themoviedb.org/'>
                        <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo-image'/>
                    </a>
                </Content>
            </Wrapper>
        </header>
    )
}

export default Header


