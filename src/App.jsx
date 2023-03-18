import React from 'react'; 

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Pricing } from './components/Pricing';
import { CssBaseline } from '@mui/material';
import { Footer } from './components/Footer';

import {
  Routes,
  Route,
} from "react-router-dom";
import { NavLayout } from './components/NavLayout';

const App = () => {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;