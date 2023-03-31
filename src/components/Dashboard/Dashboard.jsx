import React, {useState} from 'react';
import { Box, Stack } from "@mui/material";
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import useStyles from "../../styles/dashboardStyles";

export const Dashboard = () => {
  const [nextProcess, setNextProcess] = useState(0)
  const [activeProcesses, setActiveProcesses] = useState([])
  const classes = useStyles();

  function handleProcessChange(nextProc){
    setActiveProcesses(current => [...current, nextProc]);
  }

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      className={classes.stack}
    >
      <Sidebar handleButtonClick={handleProcessChange} />
      <Board activeProcesses={activeProcesses} nextProcess={nextProcess}/>
    </Stack>
  )
}
