import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';
import classes from '../styles/navBarStyles';
import { Cookies } from 'react-cookie';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {
  Link as RouterLink,
} from "react-router-dom";

function ElevationScroll(props) {
  const { children, wind} = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 1,
    target: wind ? wind() : undefined,
  });

  if(window.location.pathname === "/") {
    return React.cloneElement(children, {
      // elevation: trigger ? 4 : 0,
      style:{
        backgroundColor: trigger ? "#389AF4": "#fff",
        color: trigger ? "#fff" : "#389AF4",
        boxShadow: "0 4px 10px 0 rgba(56, 154, 244, 0.15)"
      }
    });
  }
  return React.cloneElement(children, {
      style:{
        backgroundColor: "#389AF4",
        color: "#fff",
      }
  })
}

export const Navbar = ({setLoginStatus}, props) => {
	const storedCookies = new Cookies();
	const tokenCookie = storedCookies.get("token");

  return (
    <ElevationScroll {...props}>

    <AppBar
        position="sticky"
        elevation={0}
      >
        <Toolbar sx={{display: "flex", width: "90%", margin: "auto"}} style={{ padding: 0}} >

          <Box sx={{...classes.innerBox}}>
            <Typography variant="h5" sx={{ color:"inherit", fontWeight: "800"}}>
              Data Lume
            </Typography>
          </Box>

          <Box sx={{...classes.innerBox}} style={{marginRight: "auto", justifyContent:"end"}}>
            <nav>
                <Link component={RouterLink} to="/" sx={{...classes.navItem}}>
                  Home
                </Link>

                <Link component={RouterLink} to="/pricing" sx={{...classes.navItem}}>
                  Pricing
                </Link>

                <Link component={RouterLink} to="/pricing" sx={{...classes.navItem}}>
                  Resources
                </Link>

                <Link component={RouterLink} to="/pricing" sx={{...classes.navItem}}>
                  Blog
                </Link>

                {tokenCookie ?
                  <Link component={RouterLink} to="/models" sx={{...classes.navItem}}>
                    Models
                  </Link>
                  :
                  null
                }
               
                {tokenCookie ? 
                    <Link component={RouterLink} to="/" sx={{...classes.navItem}} onClick={() => {
                      storedCookies.remove("token");
                      setLoginStatus(false);
                      window.location.reload(true);
                    }}>
                      Logout
                    </Link>
                  :
                    <Link component={RouterLink} to="/login" sx={{...classes.navItem}}>
                      Login
                    </Link>
                }
            </nav>
          </Box>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
