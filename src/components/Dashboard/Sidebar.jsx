import React from 'react';
import classes from '../../styles/dashboardStyles';

import DataSource from './icons/DataSource';
import Clean from './icons/Clean';
import FeatureEngineering from './icons/FeatureEngineering';
import Model from './icons/Model';
import Deployment from './icons/Demployment';

import { DataUpload } from '../Processes/DataUpload';
import { DataCleaning } from '../Processes/DataCleaning';

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export const Sidebar = ({nextProcess, handleButtonClick}) => {

  return (
    <Box 
      flex={0.6} 
      // p={2}
      // sx={{ display: {xs: "none", sm: "block" }}}
      sx={{...classes.sideBar}}
    >
        <List>
          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button" onClick={() => handleButtonClick(<DataUpload />)}>
              <ListItemIcon>
                <DataSource style={{paddingRight: "7px", transform: `scale(1.7)`}}/>
              </ListItemIcon>
              <ListItemText primary="Upload data" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button" onClick={() => handleButtonClick(<DataCleaning />)}>
              <ListItemIcon>
                <Clean style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Clean data" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button">
              <ListItemIcon>
                <FeatureEngineering style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Feature engineering" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button">
              <ListItemIcon>
                <Model style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Model" />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{...classes.istItem}}>
            <ListItemButton component="button">
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
