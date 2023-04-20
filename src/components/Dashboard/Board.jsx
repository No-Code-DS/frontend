import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import dashboardClasses from "../../styles/dashboardStyles";
import processClasses from "../../styles/processStyles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';

export const Board = ({activeProcesses, handleProcessCancel}) => {

  return (
    <Box flex={2} p={20} >
      <Box sx={{...dashboardClasses.board}} >
        <Stack direction="row" spacing={3} style={{}} >
          {activeProcesses.map((proc, index) => (
            <Stack direction="column" spacing={1} key={index} style={{ height:"100px", width:"100px"}}>
              <Stack direction="row" spacing={1} key={index+1} style={{height:"300px", width:"500px"}}>
                <Stack direction="column" alignItems="center" spacing={2} sx={{height:"70px", width:"70px"}}>

                  {proc.component}

                  {
                    index === activeProcesses.length - 1 ? 
                    // <Button sx={{...processClasses.cancelButton}} onClick={() => handleProcessCancel()} startIcon={<DeleteIcon />}>
                    <Button sx={{...processClasses.cancelButton}} onClick={() => handleProcessCancel()} >
                      Cancel
                    </Button>
                    :
                    null 
                  }

                </Stack>

                <ArrowRightAltIcon style={{ marginTop: "10px", transform: 'scale(1.8)', }} />
              </Stack>
            </Stack> 
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
