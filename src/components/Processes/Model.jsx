import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import ModelIcon from '../Dashboard/icons/ModelIcon';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem, TextField, BottomNavigation, FormControlLabel, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Cookies } from 'react-cookie';
import classes from '../../styles/processStyles';
import { getData } from './helperFunctions';

export const Model = ({projectId}) => {
  const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modelOptions, setModelOptions] = useState([]);
  const [data, setData] = useState({columns: [], rows: []});
  const [selectedColumn, setSelectedColumn] = useState();
  const [selectedOption, setSelectedOption] = useState("LinearRegression");
  const [selectedParam, setSelectedParam] = useState({"fit_intercept": false, "positive": false});

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

	async function getModelOptions() {
		const response = await fetch(`http://localhost:8000/projects/model_map`, {
			headers: { 
				'accept': 'application/json',
				// 'Authorization': 'Bearer ' + tokenCookie.access_token,
			},
		});
		let jsonData = await response.json();
		setModelOptions(jsonData);
	}

	function handleModelOptionChange(option) {
		setSelectedOption(option)
		if (option === "LinearRegression") {
			setSelectedParam({"fit_intercept": false, "positive": false})
		}
	}

	async function handleSubmit() {
		let obj = {
			"name": selectedOption,
			"prediction_field": selectedColumn,
			"params": selectedParam,
		}
    const jsonData = JSON.stringify(obj);
		const response = await fetch(`http://localhost:8000/projects/${projectId}/model`, {
			method: 'POST',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			},
			body: jsonData
		});
		const responseData = await response.json();
		console.log(responseData)
	}

	useEffect(() => {
		async function fetchData() {
			let jsonData = await getData(projectId, tokenCookie);
			setData(jsonData);
			setSelectedColumn(jsonData.columns[0]);
		}
		fetchData();
		getModelOptions()
	}, [])	

  return (
    <Box sx={{...classes.processBox}}>
      <IconButton onClick={() => setOpen(true)}>
        <ModelIcon style={{ transform: 'scale(2.7)' }} />
      </IconButton>
      <Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.cleanDialogContainer}}>
				<DialogTitle sx={{...classes.title}}>Model</DialogTitle>

				<DialogContent dividers sx={{...classes.cleanWindowContainer}}>
					<Paper sx={{ width: '100%', height: '100%', }}>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>
										<FormControl variant="standard" sx={{width: "130px"}}>
											<InputLabel sx={{border:"none"}}id="demo-simple-select-label">Column</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={selectedColumn}
												onChange={(event) => {
													setSelectedColumn(event.target.value);
												}}
												sx={{border:"none"}}
											>
												{data.columns.map((col, index) => (
													<MenuItem value={col} key={index}>{col}</MenuItem>
												))}
											</Select>
										</FormControl>
									</TableCell>

									<TableCell>
										<FormControl variant="standard" sx={{width: "100px"}}>
											<InputLabel id="demo-simple-select-label">Operation</InputLabel>
												<Select
													value={selectedOption}
													onChange={(e) => handleModelOptionChange(e.target.value)}
												>
												{modelOptions && modelOptions.map((col, index) => (
													<MenuItem value={col.name} key={index}>{col.name}</MenuItem>
												))}
												</Select>
										</FormControl>
									</TableCell>

									<TableCell>
										{selectedOption && (
											<div>
												{selectedOption === 'LinearRegression' ? (
													<>
														<FormControlLabel
															control={<Checkbox />}
															label="fit intercept"
															onChange={(e) => setSelectedParam(prev => ({...prev, fit_intercept
															:e.target.checked}))}
														/>
														<FormControlLabel
															control={<Checkbox />}
															label="positive"
															onChange={(e) => setSelectedParam(prev => ({...prev, positive
															:e.target.checked}))}
														/>
													</>
												) : (
													<TextField type="number" label="Estimator" onChange={(e) => setSelectedParam({"n_estimators": e.target.value})}/>
												)}
											</div>
										)}
									</TableCell>
								</TableRow>
								</TableBody>
							</Table>
					</TableContainer>
					</Paper>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Close</Button>
					<Button onClick={() => handleSubmit()} color="primary" autoFocus >Submit</Button>
				</DialogActions>

			</Dialog>
    </Box>
  )
}
