import React, {useState} from 'react';
import { Stack } from "@mui/material";
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import classes from "../../styles/dashboardStyles";

export const Dashboard = () => {
  const [activeProcesses, setActiveProcesses] = useState([])

  function handleProcessChange(nextProc) {
    setActiveProcesses(current => [...current, nextProc]);
  }

  function handleProcessCancel() {
    setActiveProcesses(activeProcesses.slice(0, -1))
  }

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      sx={{...classes.stack}}
    >
      <Sidebar lastProcessOrder={activeProcesses.length} handleButtonClick={handleProcessChange} handleProcessCancel={handleProcessCancel} />
      <Board activeProcesses={activeProcesses} handleProcessCancel={handleProcessCancel} />
    </Stack>
  )
}
