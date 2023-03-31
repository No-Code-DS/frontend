import React from 'react'; 

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Pricing } from './components/Pricing';
import { Models } from './components/Models';
import { CssBaseline } from '@mui/material';
import { Dashboard } from './components/Dashboard/Dashboard';

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
					<Route path="/" element={<Home />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/pricing" element={<Pricing />} />
					<Route path="/models" element={<Models />} />
			</Routes>
		</>
	)
}

export default App;