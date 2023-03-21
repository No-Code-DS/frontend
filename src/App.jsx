import React from 'react'; 

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Pricing } from './components/Pricing';
import { CssBaseline } from '@mui/material';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard/Dashboard';
// import { NavLayout } from './components/NavLayout';

import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pricing" element={<Pricing />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App;