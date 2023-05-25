import React, { useState, useEffect, useRef } from 'react';
import classes from '../../styles/dashboardStyles';
import DataSource from './icons/DataSource';
import Clean from './icons/Clean';
import FeatureEngineeringIcon from './icons/FeatureEngineeringIcon';
import ModelIcon from './icons/ModelIcon';
import Deployment from './icons/Demployment';
import { DataUpload } from '../Processes/DataUpload';
import { DataCleaning } from '../Processes/DataCleaning';
import { FeatureEngineering } from '../Processes/FeatureEngineering';
import { Model } from '../Processes/Model';

import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export const Sidebar = ({activeProcesses, lastProcessOrder, handleButtonClick, handleProcessCancel, projectId, project=false}) => {
	const [dataSourceId, setDataSourceId] = useState({});
  const hasEffectRun = useRef(false);

  
  function handleAddProcess(nextProcessOrder=false, component=false, existingProject=false) {
    if (existingProject) {
      handleButtonClick(existingProject)
    }
    else if (nextProcessOrder === (activeProcesses.length + 1)) {
      handleButtonClick({
        "order": nextProcessOrder,
        "component": component
      })
    }
  }

  useEffect(() => {
    if (!hasEffectRun.current) {
      if (project) {
        let processes = [];
        processes.push({"order":1, "component": <DataUpload handleProcessCancel={handleProcessCancel} projectId={projectId} setDataSourceId={setDataSourceId} />});
        if (project.cleaning != null) {
          processes.push({"order": 2, "component": <DataCleaning projectId={projectId} dataSourceId={dataSourceId}/>});
        }
        handleAddProcess(false, false, processes);
      }
      hasEffectRun.current = true;
    }
  }, [])

  return (
    <Box 
      flex={0.6} 
      // p={2}
      // sx={{ display: {xs: "none", sm: "block" }}}
      sx={{...classes.sideBar}}
    >
        <List>
          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button" onClick={() => handleAddProcess(1, <DataUpload handleProcessCancel={handleProcessCancel} projectId={projectId} setDataSourceId={setDataSourceId} />)}>
              <ListItemIcon>
                <DataSource style={{paddingRight: "7px", transform: `scale(1.7)`}} />
              </ListItemIcon>
              <ListItemText primary="Upload data" />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button" onClick={() => {
                handleAddProcess(2, <DataCleaning projectId={projectId} dataSourceId={dataSourceId}/>)
              }}>
              <ListItemIcon>
                <Clean style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Clean data" />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button" onClick={() => handleAddProcess(3, <FeatureEngineering projectId={projectId} dataSourceId={dataSourceId}/>)}>
              <ListItemIcon>
                <FeatureEngineeringIcon style={{transform: "scale(1.8)"}}  />
              </ListItemIcon>
              <ListItemText primary="Feature engineering" />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button" onClick={() => handleAddProcess(4, <Model />)}>
              <ListItemIcon>
                <ModelIcon style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Model" />
            </ListItemButton>
          </ListItem>

          <ListItem sx={{...classes.listItem}}>
            <ListItemButton component="button">
              <ListItemIcon>
                <Deployment style={{transform: "scale(1.8)"}}/>
              </ListItemIcon>
              <ListItemText primary="Deployment" />
            </ListItemButton>
          </ListItem>

        </List>
    </Box>
  )
}
