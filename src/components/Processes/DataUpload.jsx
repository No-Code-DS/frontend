import React, { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import { Box, Typography, Stack } from '@mui/material';
import DataSource from '../Dashboard/icons/DataSource';
import classes from "../../styles/processStyles";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Cookies } from 'react-cookie';

export const DataUpload = ({setData, projectId}) => {
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
	const [file, setFile] = useState();
	const [name, setName] = useState();
	const fileInputRef = useRef(null);
	const [open, setOpen] = useState(false);

	function convertDataFormat(inputObj) {
		const entries = Object.entries(inputObj);
		const columns = entries.map(([key, value]) => key);
		const rows = entries[0][1].map((_, rowIndex) => entries.map(([_, value]) => value[rowIndex]));
		return { columns, rows };
	}

	async function getFile(dataSourceId) {
		const response = await fetch(`http://localhost:8000/projects/${projectId}/data_source`, {
			headers: { 
				'accepts': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			},
		});
		let jsonData = await response.json();
		let formattedData = convertDataFormat(jsonData);
		setData({"id": dataSourceId, "data": formattedData});
	}

	async function sendFile() {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('data_source_name', name);

		const response = await fetch(`http://localhost:8000/projects/${projectId}/data_source`, {
			method: 'POST',
			headers: { 
				'accepts': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			},
			body: formData,
		});
		let responseData = await response.json()
		getFile(responseData.id);
	}

  return (
    <Box sx={{...classes.processBox}}>
		
			<IconButton onClick={() => setOpen(true)}>
				<DataSource style={{ transform: 'scale(2.7)' }} />
			</IconButton>
	
			<Dialog open={open} maxWidth="lg" fullWidth={false} >
				<DialogTitle sx={{...classes.uploadTitle}}> Upload data source </DialogTitle>
						
				<DialogContent dividers sx={{...classes.uploadDialogContainer}} >
					<Stack spacing={4}>
						<Box>
							<Typography variant="h5">
								Data source name:
							</Typography>
							<TextField size="small" sx={{width:"600px"}} id="outlined-basic" variant="outlined" onChange={(e) => setName(e.target.value)} />
						</Box>

						<Box>
							<Typography variant="h5">
								Choose file source:
							</Typography>
							
							<IconButton onClick={() => fileInputRef.current.click()}>
								<CloudUploadIcon />
							</IconButton>
						</Box>

						<input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
					</Stack>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Close</Button>
					<Button color="primary" onClick={() => {
						sendFile();
						setOpen(false);
					}} autoFocus>Save</Button>
				</DialogActions>
			</Dialog >
			
    </Box>
	)
}
