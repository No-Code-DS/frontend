import React from 'react';
import { Box } from '@mui/material';
import useStyles from "../../styles/dashboardStyles";
import DataSource from './icons/DataSource';
import IconButton from '@mui/material/IconButton';

export const Board = () => {
  const classes = useStyles();
  return (
    <Box flex={2} p={20} >
      <Box className={classes.board}>
        <IconButton onClick={() => console.log('Button clicked')}>
          <DataSource style={{transform: "scale(2.7)"}}/>
        </IconButton>
      </Box>
    </Box>
  )
}
