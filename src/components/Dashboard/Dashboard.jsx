import React, {useState} from 'react';
import { Box, Stack } from "@mui/material";
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import useStyles from "../../styles/dashboardStyles";

export const Dashboard = () => {
  const [nextProcess, setNextProcess] = useState(0)
  const classes = useStyles();

  function handleProcessChange(nextProc){
    setNextProcess(nextProc);
  }

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      className={classes.stack}
    >
      <Sidebar nextProcess={nextProcess} handleButtonClick={handleProcessChange} />
      <Board nextProcess={nextProcess}/>
    </Stack>
  )
}
