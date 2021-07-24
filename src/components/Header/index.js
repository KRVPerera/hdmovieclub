import Router from 'react';
import {Link} from 'react-router-dom';

// logos
import RMDBLogo from '../../images/react-movie-logo.svg'
import TMDBLogo from '../../images/tmdb_logo.svg'

// styles
import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"

const Header = () => (
    <Wrapper>
        <Content>
            <Link to='/'>
                <LogoImg src={RMDBLogo} alt='rmdb-logo-image'/>
            </Link>
            <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo-image'/>
        </Content>
    </Wrapper>
)

export default Header;


