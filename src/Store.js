import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const initialState = {
    clubOnState : false
};

export const Context = React.createContext();

const Store = ({ children }) => {
    const [gState, setGState] = useState(initialState)

    useEffect(() => {
        const hdMovieClubClubOnState = cookies.get('hdMovieClubClubOnState')
        if (typeof hdMovieClubClubOnState !== 'undefined') {
            setGState(hdMovieClubClubOnState)
        }
    }, [])

    useEffect(() => {
        cookies.set('hdMovieClubClubOnState', gState, {path: '/'});
    }, [gState])

    return (
        <Context.Provider value={[gState, setGState]} >
            {children}
        </Context.Provider>
    )
}

export default Store