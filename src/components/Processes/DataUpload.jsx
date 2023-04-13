import React, { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import DataSource from '../Dashboard/icons/DataSource';

export const DataUpload = () => {
	const [file, setFile] = useState();
	const fileInputRef = useRef(null);

  function handleFileInput (event) {
    fileInputRef.current.click();
  };
	function handleFileUpload (event) {
		setFile(event.target.files[0]);
		console.log(event.target.files);
		const formData = new FormData();
		fetch(
			'url',
			{
				method: "POST",
				body: formData
			}
		).then((response) => response.json()).then(
			(result) => {
				console.log('success', result)
			}
		)
	};

  return (
    <>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleFileUpload}
				// accept=".csv" 
			/>
			<IconButton onClick={handleFileInput} style={{ width: "40px" }}>
				<DataSource style={{ transform: 'scale(2.7)' }} />
			</IconButton>
    </>
  )
}
