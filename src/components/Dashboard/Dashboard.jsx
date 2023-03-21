import React from 'react';
import { Box, Stack } from "@mui/material";
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import useStyles from "../../styles/dashboardStyles";

export const Dashboard = () => {
  const classes = useStyles();
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      className={classes.stack}
    >
      <Sidebar />
      <Board />
    </Stack>
  )
}
