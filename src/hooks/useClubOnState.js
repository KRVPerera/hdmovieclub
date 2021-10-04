import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useClubOnState = () => {
    const [clubOnState, setClubOnState] = useState(false);

    useEffect(() => {
        const hdMovieClubClubOnState = cookies.get('hdMovieClubClubOnState')
        if (typeof hdMovieClubClubOnState !== 'undefined') {
            if (hdMovieClubClubOnState !== clubOnState) {
                cookies.set('hdMovieClubClubOnState', hdMovieClubClubOnState, {path: '/'});
                setClubOnState(hdMovieClubClubOnState)
            }
            return
        }
    }, [])

    useEffect(() => {
        cookies.set('hdMovieClubClubOnState', clubOnState, {path: '/'});
    }, [clubOnState])

    return {clubOnState, setClubOnState}
}