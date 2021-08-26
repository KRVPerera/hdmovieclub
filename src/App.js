import React, {useState} from 'react'

// Routing
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// Components
import Header from './components/Header'
import Home from './components/Home'
import Movie from "./components/Movie"
import TV from "./components/TV"
import NotFound from "./components/NotFound"

// styles
import {GlobalStyle} from "./GlobalStyle"

const App = () => {
    const [clubOnState, setClubOnState] = useState(true);
    return (
        <Router>
            <Header clubOnState={clubOnState} setClubOnState={setClubOnState}/>
            <Routes>
                <Route path="/" element={<Home clubOnState={clubOnState} setClubOnState={setClubOnState}/>}/>
                <Route path="/movie/:movieId" element={<Movie/>}/>
                <Route path="/tv/:tvId" element={<TV/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
            <GlobalStyle/>
        </Router>
    );
}

export default App;
