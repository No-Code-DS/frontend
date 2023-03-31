import React, { useRef, useState } from 'react'
import Clean from './icons/Clean';
import { Stack } from '@mui/material';


export const Processes = ({nextProcess}) => {
  const [currentProcess, setCurrentProcess] = useState(nextProcess)
  
  return (
    <>
      {/* {DataProcesses.slice(0, nextProcess+1).map((Proc, index) => (
          <Proc key={index} />
          <ArrowRightAltIcon style={{ transform: `scale(1.7)` }}/>
      ))} */}
    </>
  )
}
