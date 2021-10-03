import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useClubOnState = () => {
    const [clubOnState, setClubOnState] = useState(false);
    // const [clubOnState, setClubOnState] = useState(false);

    useEffect(() => {
        const hdMovieClubClubOnState = cookies.get('hdMovieClubClubOnState')
        if (typeof hdMovieClubClubOnState !== 'undefined') {
            if (hdMovieClubClubOnState === clubOnState) {
                setClubOnState(hdMovieClubClubOnState)
            }
            cookies.set('hdMovieClubClubOnState', clubOnState, {path: '/'});
            return
        }
        cookies.set('hdMovieClubClubOnState', clubOnState, {path: '/'});
    }, [clubOnState])

    useEffect(() => {
        cookies.set('hdMovieClubClubOnState', clubOnState, {path: '/'});
    }, [clubOnState])

    return {clubOnState, setClubOnState}
}