import React, { useState } from 'react'; 

import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Pricing } from './components/Pricing';
import { Models } from './components/Models';
import { CssBaseline } from '@mui/material';
import { Dashboard } from './components/Dashboard/Dashboard';
import { LogIn } from './components/Account/LogIn';
import { SignUp } from './components/Account/SignUp';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import {
  Routes,
  Route,
} from "react-router-dom";


const theme = createTheme({
	typography: {
		allVariants: {
			fontFamily: "Inter",
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: "#f4f4f4",
				}
			}
		}
	}
});

const App = () => {
  const [loginStatus, setLoginStatus] = useState(false);
	const [projectId, setProjectId] = useState(0);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Navbar loginStatus={loginStatus} setLoginStatus={(status) => setLoginStatus(status)} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard projectId={projectId} />} />
				<Route path="/pricing" element={<Pricing />} />
				<Route path="/models" element={<Models projectId={projectId} setProjectId={(id) => setProjectId(id)} />} />
				<Route path="/login" element={<LogIn loginStatus={loginStatus} setLoginStatus={(status) => setLoginStatus(status)} />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</ThemeProvider>
	)
}

export default App;