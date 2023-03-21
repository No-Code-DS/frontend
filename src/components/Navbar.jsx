import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import AdbIcon from '@mui/icons-material/Adb';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import GlobalStyles from '@mui/material/GlobalStyles';

import { Home } from './Home';
import { Pricing } from './Pricing';

import {
  Link as RouterLink,
} from "react-router-dom";
import { NavLayout } from './NavLayout';

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
              <Link component={RouterLink} to="/dashboard" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
                Dashboard
              </Link>
              <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5, color: "blue", textTransform: "none" }}>
                Login
              </Button>
          </nav>
        </Toolbar>

      </AppBar>
  );
}
