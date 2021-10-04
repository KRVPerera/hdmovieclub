import {Link} from 'react-router-dom';
import Cookies from 'universal-cookie';

// logos
import RMDBLogo from '../../images/react-movie-logo.svg'

import TMDBLogo from '../../images/tmdb_logo_p_short.svg'
// styles

import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import React, {useContext} from "react";
import {Context} from "../../Store";

const cookies = new Cookies();

const Header = () => {

    const [gState, setGState] = useContext(Context)

    const flipClubStatusAndCookie = async () => {
        setGState(prevState => ({
                clubOnState: !prevState.clubOnState
            })
        )
        cookies.set('hdMovieClubClubOnState', gState, {path: '/'});
    }

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
                                checked={gState.clubOnState}
                                onChange={() => flipClubStatusAndCookie()}
                                name="on"
                                color="primary"
                            />
                        }
                                          label={gState.clubOnState ? "\tHD Movie club" : "\tAll Movies"}
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


