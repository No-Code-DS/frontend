import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AdbIcon from '@mui/icons-material/Adb';

import {
  Link as RouterLink,
} from "react-router-dom";

const pages = ['Home', 'Pricing'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Navbar = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: '#241e53'}}
      >
        <Toolbar sx={{ justifyContent: "space-between" }} >

          <Typography variant="h6" sx={{ color:"white"}}>
            Company name
          </Typography>

          <AdbIcon sx={{ 
            display: { xs: 'flex'}, 
            color:"white", 
            marginLeft: "80px",
            display:{xs:"none", sm:"block"}
          }} />

          <nav>
              <Link component={RouterLink} to="/" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
                Home
              </Link>

              <Link component={RouterLink} to="/pricing" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
                Pricing
              </Link>

              <Link component={RouterLink} to="/models" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
                Models
              </Link>

              <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5, color: "blue", textTransform: "none" }}>
                Login
              </Button>
          </nav>
        </Toolbar>

      </AppBar>
  );
}
