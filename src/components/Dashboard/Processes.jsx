import React, { useRef, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import DataSource from './icons/DataSource';
import Clean from './icons/Clean';
import {DataCleaning} from '../Processes/DataCleaning';


const processes = [
    <IconButton>
        <DataSource style={{transform: "scale(2.7)"}}/>
    </IconButton>,
    <IconButton onClick={() => alert('Button clicked')}>
        <DataSource style={{transform: "scale(2.7)"}}/>
    </IconButton>
]

export const Processes = ({nextProcess}) => {
  const [activeProcesses, setActiveProcesses] = useState([processes[nextProcess]])
  const fileInputRef = useRef(null);

  const handleFileInput = (event) => {
    fileInputRef.current.click();
    const file = event.target.files[0];
    // handle file upload logic here
  };

  return (
    <>
      {/* <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInput}
        accept=".csv" 
      />
      <IconButton onClick={handleFileInput}>
        <DataSource style={{ transform: 'scale(2.7)' }} />
      </IconButton> */}
      <DataCleaning />
    </>
    // processes[nextProcess]
  )
}

