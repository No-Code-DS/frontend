import React, {useState, useEffect} from 'react';
import { Stack } from "@mui/material";
import { Sidebar } from './Sidebar';
import { Board } from './Board';
import classes from "../../styles/dashboardStyles";
import { useLocation } from 'react-router-dom';

export const Dashboard = ({projectId}) => {
  const [activeProcesses, setActiveProcesses] = useState([])
  const location = useLocation();
  const project = location.state && location.state.project;

  function handleProcessChange(nextProc) {
    if (Array.isArray(nextProc)) {
        console.log(nextProc)
        setActiveProcesses(current => [...current, ...nextProc]);
    } else {
      setActiveProcesses(current => [...current, nextProc]);
    }
  }

  function handleProcessCancel() {
    setActiveProcesses(activeProcesses.slice(0, -1))
  }

  useEffect(() => {
    console.log(activeProcesses.length)
    console.log(activeProcesses)
  }, [])

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      sx={{...classes.stack}}
    >
      <Sidebar activeProcesses={activeProcesses} projectId={projectId} lastProcessOrder={activeProcesses.length} handleButtonClick={handleProcessChange} handleProcessCancel={handleProcessCancel} project={project}/>
      <Board activeProcesses={activeProcesses} handleProcessCancel={handleProcessCancel} />
    </Stack>
  )
}