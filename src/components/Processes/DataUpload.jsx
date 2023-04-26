import React, { useState, useRef } from 'react'
import IconButton from '@mui/material/IconButton';
import { Box, Typography, Stack } from '@mui/material';
import DataSource from '../Dashboard/icons/DataSource';
import classes from "../../styles/processStyles";
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import uuid from "react-uuid";

export const DataUpload = ({setData}) => {
	const fileReader = new FileReader();
	const [file, setFile] = useState();
	const [name, setName] = useState();
	// const [array, setArray] = useState([]);
	const fileInputRef = useRef(null);
	const [csvData, setCsvData] = useState([]);
	const [open, setOpen] = useState(false);
	
	function arrayToObject(arr) {
		const columns = Object.keys(arr[0]);
		const rows = arr.map(obj => {
			return Object.values(obj);
		});
		return {
			columns,
			rows,
		};
	}

	function csvFileToArray (string) {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });
		let dataResult = arrayToObject(array);
		return dataResult;
  };

	async function sendFile(name, file) {
		// const response = await fetch('http://localhost:8000/projects/login', {
		// 	method: 'POST',
		// 	headers: { 
		// 		'Content-Type': 'application/json',
		// 		'accepts': 'application/json',
		// 	},
		// 	body: jsonData,
		// });
	}

	function handleFileUpload (event) {
		if (file) {
			fileReader.onload = function (event) {
				const text = event.target.result;
				let dataResult = csvFileToArray(text);
				setData(dataResult);
				sendFile(name, dataResult);
			};
			fileReader.readAsText(file);
		}
	};

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
						handleFileUpload();
						setOpen(false);
					}} autoFocus>Save</Button>
				</DialogActions>
			</Dialog >
			
    </Box>
	)
}
