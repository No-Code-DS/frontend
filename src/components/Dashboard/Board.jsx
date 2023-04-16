import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import classes from "../../styles/dashboardStyles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

export const Board = ({activeProcesses}) => {

  return (
    <Box flex={2} p={20} >
      <Box sx={{...classes.board}}>
        <Stack direction="row" spacing={4}>
          {activeProcesses.map((proc, index) => (
            <Stack direction="row" spacing={3} key={index}>
              {proc["component"]}
              <ArrowRightAltIcon style={{ marginTop: "10px", transform: 'scale(1.8)', }} />
            </Stack> 
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
