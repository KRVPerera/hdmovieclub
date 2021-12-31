import {Wrapper, Content} from "./Footer.styles"
import React, {useContext} from "react";
import {Context} from "../../Store";

const Footer = () => {
    return (
        <header>
            <Wrapper>
                <Content>
                    <p>
                        <a href="https://icons8.com/icon/1427/film-reel">Film Reel icon by Icons8</a>
                    </p>
                    <p>
                        <a href="https://www.youtube.com/watch?v=nTeuhbP7wdE">Created by following Weibenfalk
                            tutorial</a>
                    </p>
                </Content>
            </Wrapper>
        </header>
    )
}

export default Footer


