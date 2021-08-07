import {Link} from 'react-router-dom';

// logos
import RMDBLogo from '../../images/react-movie-logo.svg'

import TMDBLogo from '../../images/tmdb_logo_p_short.svg'
// styles

import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"

const Header = () => {

    return (
        <Wrapper>
            <Content>
                <Link to='/'>
                    <LogoImg src={RMDBLogo} alt='rmdb-logo-image'/>
                </Link>

                <a href='https://www.themoviedb.org/'>
                    <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo-image'/>
                </a>
            </Content>
        </Wrapper>
    )
}

export default Header


