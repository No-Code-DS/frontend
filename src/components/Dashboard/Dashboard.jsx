import React, {useState} from 'react';
import { Stack } from "@mui/material";
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import classes from "../../styles/dashboardStyles";

export const Dashboard = () => {
  const [activeProcesses, setActiveProcesses] = useState([])

  function handleProcessChange(nextProc){
    setActiveProcesses(current => [...current, nextProc]);
  }

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      // className={classes.stack}
      sx={{...classes.stack}}
    >
      <Sidebar handleButtonClick={handleProcessChange} />
      <Board activeProcesses={activeProcesses} />
    </Stack>
  )
}
