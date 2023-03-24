import React from 'react';
import { Box } from '@mui/material';
import useStyles from "../../styles/dashboardStyles";
import { Processes } from './Processes';

export const Board = ({nextProcess}) => {
  const classes = useStyles();

  {console.log({nextProcess})}
  return (
    <Box flex={2} p={20} >
      <Box className={classes.board}>
        
        <Processes nextProcess={nextProcess} />
      </Box>
    </Box>
  )
}
