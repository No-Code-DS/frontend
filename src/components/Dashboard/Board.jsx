import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import useStyles from "../../styles/dashboardStyles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Processes } from './Processes';

export const Board = ({activeProcesses, nextProcess}) => {
  const classes = useStyles();
  const [currentProcess, setCurrentProcess] = useState(nextProcess)

  console.log(activeProcesses)
  return (
    <Box flex={2} p={20} >
      <Box className={classes.board}>
        <Stack direction="row" spacing={4}>
          {activeProcesses.map((proc, index) => (
              <Stack direction="row" spacing={3} key={index}>
                {proc}
                <ArrowRightAltIcon style={{ marginTop: "10px", transform: 'scale(1.8)', }} />
              </Stack> 
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
