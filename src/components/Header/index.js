import Router from 'react';

// logos
import RMDBLogo from '../../images/react-movie-logo.svg'
import TMDBLogo from '../../images/tmdb_logo.svg'

// styles
import {Wrapper, Content, LogoImg, TMDBLogoImg} from "./Header.styles"

const Header = () => (
    <Wrapper>
        <Content>
            <LogoImg src={RMDBLogo} alt='rmdb-logo-image'/>
            <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo-image'/>
        </Content>
    </Wrapper>
)

export default Header;


