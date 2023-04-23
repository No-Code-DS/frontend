import React, { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import { Box, Typography } from '@mui/material';
import DataSource from '../Dashboard/icons/DataSource';
import classes from "../../styles/processStyles";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export const DataUpload = ({setData}) => {
	const [file, setFile] = useState();
	const fileInputRef = useRef(null);
	const fileReader = new FileReader();
	const [csvData, setCsvData] = useState([]);
	const [open, setOpen] = useState(false);

	function handleFileUpload (event) {
		setFile(event.target.files[0]);
		console.log(file)
		// const formData = new FormData();
		// fetch(
		// 	'url',
		// 	{
		// 		method: "POST",
		// 		body: formData
		// 	}
		// ).then((response) => response.json()).then(
		// 	(result) => {
		// 		console.log('success', result)
		// 	}
		// )
	};

	function handleUploadDialog (event) {

	}

  return (
    <Box sx={{...classes.processBox}}>
		
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleUploadDialog}
				// accept=".csv" 
			/>
	
			<IconButton onClick={() => setOpen(true)}>
				<DataSource style={{ transform: 'scale(2.7)' }} />
			</IconButton>
	
			<Dialog open={open} maxWidth="lg" fullWidth={false} >
				<DialogTitle sx={{...classes.uploadTitle}}>Data</DialogTitle>

				<DialogContent dividers sx={{...classes.uploadDialogContainer}} >
					<Typography variant="h5">
						Data source name:
					</Typography>
					<TextField size="small" sx={{width:"500px"}} id="outlined-basic" variant="outlined" />
					<br/>

					<Typography variant="h5">
						Choose file source:
					</Typography>
					
					<IconButton onClick={() => setOpen(true)}>
						<CloudUploadIcon />
					</IconButton>

					<input type="file" style={{ display: 'none' }} />
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Close</Button>
					<Button color="primary" autoFocus>Save changes</Button>
				</DialogActions>
			</Dialog >
			
    </Box>
	)
}
