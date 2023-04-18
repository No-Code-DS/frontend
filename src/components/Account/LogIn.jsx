import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../Footer';
import classes from "../../styles/mainStyles";

import {
  Link as RouterLink,
  useNavigate 
} from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState([false, ""]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState([false, ""]);
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    navigate("/");
  }

  function checkEmail() {
    if (!email) {
      setEmailError([true, "This field is required"])
    }
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError([!emailRegex.test(email), "This is not a valid email"]);
    }
  }

  function checkPassword() {
    if (!password) {
      setPasswordError([true, "This field can't be empty"])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    checkPassword();
    const formData = new FormData(event.currentTarget);

    const jsonDataString = {};
    formData.forEach(function(value, key){
      jsonDataString[key] = value;
    });

    let jsonData = JSON.stringify(jsonDataString)

    if (!emailError[0]) {
      try {
        const response = await fetch('http://localhost:8000/users/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'accepts': 'application/json',
          },
          body: jsonData,
        });
        if (response.ok) {
          setLoggedIn(true);
        }
        console.log(response)
        if (response.status == 409) {
          const responseData = await response.json();
          setEmailError([true, responseData.detail])
        }
      } catch (error) {
        console.error(error);
      }
    }
    
  };

 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              error={emailError[0]}
              helperText={emailError[0] ? emailError[1] : ""}
              onBlur={() => checkEmail()}
            />

            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError[0]}
              helperText={passwordError[0] ? passwordError[1] : ""}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" style={{color:"black", textDecoration: "none"}} sx={{...classes.optionLinks}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup" style={{color:"black", textDecoration: "none"}} sx={{...classes.optionLinks}}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
