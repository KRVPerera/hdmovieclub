import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';

// logos
import RMDBLogo from '../../images/react-movie-logo.svg'

import TMDBLogo from '../../images/tmdb_logo_p_short.svg'
// styles

import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import React, {useContext, useState} from "react";
import {Context} from "../../Store";
import {useAuth} from "../../contexts/AuthContext";
import {Card, Button, Alert} from 'react-bootstrap'


const cookies = new Cookies();

const Header = () => {

    const [gState, setGState] = useContext(Context)
    const [error, setError] = useState()
    const {currentUser, logoutuser} = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logoutuser()
            navigate("/login")
        } catch {
            setError('Failed to log out')
        }
    }

    async function handleLogin() {
        setError('')
        navigate("/login")
    }

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

                    {currentUser && <Card className="bg-primary">
                        <Card.Body>
                            Hello {currentUser.displayName? currentUser.displayName : currentUser.email}
                        </Card.Body>
                    </Card>}

                    {error && <Card className="bg-primary">
                        <Card.Body>
                            <Alert variant="danger">{error}</Alert>
                        </Card.Body>
                    </Card>}


                    {currentUser &&
                        <Button variant="link" className="text-white" onClick={handleLogout}>Log Out</Button>}
                    {!currentUser &&
                        <Button variant="link" className="text-white" onClick={handleLogin}>Log in</Button>}

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


