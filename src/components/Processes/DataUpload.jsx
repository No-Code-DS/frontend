import React, { useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import DataSource from '../Dashboard/icons/DataSource';

export const DataUpload = () => {
	const fileInputRef = useRef(null);

  const handleFileInput = (event) => {
    fileInputRef.current.click();
    const file = event.target.files[0];
  };

  return (
    <>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileInput}
				accept=".csv" 
			/>
			<IconButton onClick={handleFileInput} style={{ width: "40px" }}>
				<DataSource style={{ transform: 'scale(2.7)' }} />
			</IconButton>
    </>
  )
}
