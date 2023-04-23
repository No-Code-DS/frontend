import React, { useState } from 'react'; 

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Pricing } from './components/Pricing';
import { Models } from './components/Models';
import { CssBaseline } from '@mui/material';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LogIn } from './components/Account/LogIn';
import { SignUp } from './components/Account/SignUp';

import {
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);

	return (
		<>
			<CssBaseline />
			<Navbar loginStatus={loginStatus} setLoginStatus={(status) => setLoginStatus(status)} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/models" element={<Models />} />
        <Route path="/login" element={<LogIn loginStatus={loginStatus} setLoginStatus={(status) => setLoginStatus(status)} />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</>
	)
}

export default App;