import {useEffect, useState} from "react";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const useClubOnState = () => {
    const [clubOnState, setClubOnState] = useState(false);

    useEffect(() => {
        const hdMovieClubClubOnState = cookies.get('hdMovieClubClubOnState')
        if (typeof hdMovieClubClubOnState !== 'undefined') {
            if (hdMovieClubClubOnState === "false") {
                setClubOnState(false)
            } else {
                setClubOnState(true)
            }
        }
    }, [])

    useEffect(() => {
        cookies.set('hdMovieClubClubOnState', clubOnState, {path: '/'});
    }, [clubOnState])

    return {clubOnState, setClubOnState}
}