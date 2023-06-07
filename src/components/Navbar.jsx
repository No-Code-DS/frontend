import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AdbIcon from '@mui/icons-material/Adb';
import { Box } from '@mui/material';
import classes from '../styles/navBarStyles';
import { Cookies } from 'react-cookie';

import {
  Link as RouterLink,
} from "react-router-dom";

export const Navbar = ({setLoginStatus}) => {
	const storedCookies = new Cookies();
	const tokenCookie = storedCookies.get("token");

  return (
    <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#486BBDFF'}}
      >
        <Toolbar sx={{display: "flex"}} >

          <Box sx={{...classes.innerBox}}>
            <Typography variant="h6" sx={{ 
              color:"white",
              }}>
              Company name
            </Typography>
          </Box>

          <Box sx={{...classes.innerBox}} style={{justifyContent: "center"}}>
            <AdbIcon sx={{ 
              color:"white", 
              display:{xs:"none", sm:"flex"},
            }} />
          </Box>

          <Box sx={{...classes.innerBox}} style={{marginRight: "auto", justifyContent:"end"}}>
            <nav>
                <Link component={RouterLink} to="/" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none", cursor: "pointer"}}>
                  Home
                </Link>

                <Link component={RouterLink} to="/pricing" sx={{ my: 1, mx: 1.5, color: "white", cursor: "pointer"}}>
                  Pricing
                </Link>

                {tokenCookie ?
                  <Link component={RouterLink} to="/models" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
                    Models
                  </Link>
                  :
                  null
                }
               
                {tokenCookie ? 
                  <Button variant="outlined" sx={{ my: 1, mx: 1.5, textTransform: "none", borderColor: "#0033FFFF"}} onClick={() => {
                    storedCookies.remove("token");
                    setLoginStatus(false);
                  }}>
                    <Link component={RouterLink} to="/" sx={{color:"white", borderColor: "red"}}>
                      Logout
                    </Link>
                  </Button> 
                  :
                  <Button variant="outlined" sx={{ my: 1, mx: 1.5, color: "blue", textTransform: "none" }}>
                    <Link component={RouterLink} to="/login" sx={{color:"white"}}>
                      Login
                    </Link>
                  </Button> 
                }
            </nav>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
