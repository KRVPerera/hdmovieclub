import React from 'react'

// Routing
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Components
import Header from './components/Header'
import Footer from "./components/Footer"
import Home from './components/Home'
import Movie from "./components/Movie"
import TV from "./components/TV"
import Signup from "./components/Signup";
import Login from "./components/Login";
import NotFound from "./components/NotFound"

import Store from './Store'
// styles
import {GlobalStyle} from "./GlobalStyle"
import "bootstrap/dist/css/bootstrap.min.css"
import {AuthProvider} from "./contexts/AuthContext";

const App = () => {
    return (
        <AuthProvider>
            <Store>
                <Router>
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/movie/:movieId" element={<Movie/>}/>
                        <Route path="/tv/:tvId" element={<TV/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                    <Footer className="text-center"/>
                    <GlobalStyle/>
                </Router>
            </Store>
        </AuthProvider>
    );
}

export default App;
