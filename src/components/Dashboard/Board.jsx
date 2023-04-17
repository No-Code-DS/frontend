import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import dashboardClasses from "../../styles/dashboardStyles";
import processClasses from "../../styles/processStyles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';

export const Board = ({activeProcesses, handleProcessCancel}) => {

  return (
    <Box flex={2} p={20} >
      <Box sx={{...dashboardClasses.board}}>
        <Stack direction="row" spacing={4} >
          {activeProcesses.map((proc, index) => (
            <Stack direction="column" spacing={2} key={index}>
              {/* check if its the last element and pass the prop telling it its the last one */}
              <Stack direction="row" spacing={0} key={index+1}>
                <Stack direction="column" spacing={1}>
                  {proc.component}
                  {
                    index === activeProcesses.length - 1 ? 
                    <Button sx={{...processClasses.cancelButton}} onClick={() => handleProcessCancel()} startIcon={<DeleteIcon />}>
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
