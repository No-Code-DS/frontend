import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PagesIcon from '@mui/icons-material/Pages';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import useStyles from '../../styles/dashboardStyles';

import DataSource from './icons/DataSource';
import Clean from './icons/Clean';
import FeatureEngineering from './icons/FeatureEngineering';
import Model from './icons/Model';
import Deployment from './icons/Demployment';

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export const Sidebar = () => {
  const classes = useStyles();
  return (
    <Box 
      flex={0.6} 
      // p={2}
      // sx={{ display: {xs: "none", sm: "block" }}}
      className={classes.sideBar}
    >
        <List >
          <ListItem className={classes.listItem}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <DataSource style={{paddingRight: "7px", transform: `scale(1.7)`}}/>
              </ListItemIcon>
              <ListItemText primary="Upload data" />
            </ListItemButton>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Clean style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Clean data" />
            </ListItemButton>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <FeatureEngineering style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Feature engineering" />
            </ListItemButton>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Model style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Model" />
            </ListItemButton>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Deployment style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Deployment" />
            </ListItemButton>
          </ListItem>
        </List>
      {/* </Box> */}
    </Box>
  )
}
