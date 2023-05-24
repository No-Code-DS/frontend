import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import dashboardClasses from "../../styles/dashboardStyles";
import processClasses from "../../styles/processStyles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const Board = ({activeProcesses, handleProcessCancel}) => {

  return (
    <Box flex={2} p={20} boxShadow="24px 23px 28px -50px rgba(0,0,0,0.75) inset" style={{ margin: 0}}>
      <Box sx={{...dashboardClasses.board}} >
        <Stack direction="row" spacing={2} style={{}} >
          {activeProcesses.map((proc, index) => (
            <Stack direction="row" spacing={2} key={index} alignItems="center" position="relative">
              <Stack direction="column" alignItems="center" justifyContent="center" spacing={0} key={index+1} style={{ width: "5rem", height:"6rem", backgroundColor: "#fff", borderRadius:"4px"}}>
                <Stack direction="column" spacing={0}>
                  {proc.component}
                </Stack>
              {
                index === activeProcesses.length - 1 ? 
                <Button sx={{...processClasses.cancelButton, marginTop: "100px"}} onClick={() => handleProcessCancel()} >
                  Cancel
                </Button>
                :
                null 
              }
              </Stack>
             <ArrowRightAltIcon style={{ transform: 'scale(1.5)', }} />
            </Stack> 
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
