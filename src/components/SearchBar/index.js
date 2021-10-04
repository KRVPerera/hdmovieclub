import React, {useState, useEffect, useRef, useContext} from 'react';
import PropTypes from 'prop-types'

// Image
import searchIcon from '../../images/search-icon.svg'
// Styles
import {Wrapper, Content} from './SearchBar.styles'
import {Context} from "../../Store";


const SearchBar = ({setSearchTerm}) => {
    const [gState] = useContext(Context)
    const [state, setState] = useState('');
    const initial = useRef(true);

    useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }
        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 500)
        return () => clearTimeout(timer);
    }, [setSearchTerm, state])

    return (
        <Wrapper>
            {!gState.clubOnState &&
                <Content>
                    <img src={searchIcon} alt='searchIcon'/>
                    <input type='text' placeholder='Search Movie'
                           onChange={event => setState(event.currentTarget.value)}
                           value={state}
                    />
                </Content>
            }
        </Wrapper>
    )
}

SearchBar.propTypes = {
    setSearchTerm: PropTypes.func,
}

export default SearchBar;