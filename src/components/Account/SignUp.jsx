import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../Footer';

import {
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

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState([false, ""]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState([false, ""]);
  const [password2, setPassword2] = useState('');
  const [password2Error, setPassword2Error] = useState([false, ""]);
  const [loggedIn, setLoggedIn] = useState(false);

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
    else {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      setPasswordError([!passwordRegex.test(password), "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit."]);
    }
  }
  
  function checkPasswordConfirm() {
    console.log(password2, password)
    if (password2 != password) {
      setPassword2Error([true, "Passwords don't match"])
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const jsonDataString = {};
    formData.forEach(function(value, key){
      jsonDataString[key] = value;
    });

    let jsonData = JSON.stringify(jsonDataString)

    if (!(passwordError[0] && password2Error[0] && emailError[0])) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          headers: { 
            'Access-Control-Allow-Origin': "*",
            'Content-Type': 'application/json',
            'accepts': 'application/json',
          },
          body: jsonData,
        });
        if (response.ok) {
          navigate("/");
        }
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
          Sign up
        </Typography>

        {/* this doesnt need to be a form maybe change it later */}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password1"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError[0]}
                helperText={passwordError[0] ? passwordError[1] : ""}
                onBlur={() => checkPassword()}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Repeat Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) => setPassword2(e.target.value)}
                error={password2Error[0]}
                helperText={password2Error[0] ? password2Error[1] : ""}
                onBlur={() => checkPasswordConfirm()}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={() => formRef.current.reportValidity()}
          >
            Sign Up
          </Button>
          {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>

    <Footer />
    </ThemeProvider>
  );
}