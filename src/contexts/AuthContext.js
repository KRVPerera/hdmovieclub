import React, {useContext, useState, useEffect} from 'react'
import {auth} from '../Firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password, displayname) {
        return auth.createUserWithEmailAndPassword(email, password).then(
            function (user) {
                return user.user.updateProfile( {
                    displayName : displayname
                    })
            })
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logoutuser() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        logoutuser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}