import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import ModelIcon from '../Dashboard/icons/ModelIcon';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem, TextField, BottomNavigation, FormControlLabel, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Cookies } from 'react-cookie';
import classes from '../../styles/processStyles';

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
  const [selectedOptionParams, setSelectedOptionParams] = useState([]);
  const [selectedModelOptions, setSelectedModelOptions] = useState({});
  const [selectedParam, setSelectedParam] = useState();
  const [name, setName] = useState();

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	function convertDataFormat(inputObj) {
		const entries = Object.entries(inputObj);
		const columns = entries.map(([key, value]) => key);
		const rows = entries[0][1].map((_, rowIndex) => entries.map(([_, value]) => value[rowIndex]));
		return { columns, rows };
	}

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

	async function getData() {
		const response = await fetch(`http://localhost:8000/projects/${projectId}/data_source`, {
			headers: { 
				'accepts': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			},
		});
		let jsonData = await response.json();
		let formattedData = convertDataFormat(jsonData);
		setData(formattedData);
	}

	function handleColumnAdd(columnName) {
		setSelectedColumn(columnName);
		let options =  {
			"name": columnName,
			"prediction_field": "string",
			"params": {
				"fit_intercept": true,
				"positive": false
			}
		}
    setSelectedModelOptions(options);
	}

	function handleModelOptionChange(option) {
		console.log(modelOptions.find((item) => item.name === option).params)
		setSelectedOptionParams(modelOptions.find((item) => item.name === option).params)
		setSelectedOption(option)
		if (option === "LinearRegression") {
			setSelectedParam({})
		}
	}


	function handleNameChange(name) {
		setName(name);
	}

	function temp() {
		console.log(selectedParam);
	}
	useEffect(() => {
		getData();
		getModelOptions()
	}, [])	

  return (
    <Box sx={{...classes.processBox}}>
      <IconButton onClick={() => setOpen(true)}>
        <ModelIcon style={{ transform: 'scale(2.7)' }} />
      </IconButton>
      <Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.cleanDialogContainer}}>
				<button onClick={temp}>click</button>
				<DialogTitle sx={{...classes.title}}>Model</DialogTitle>

				<DialogContent dividers sx={{...classes.cleanWindowContainer}}>
					<Paper sx={{ width: '100%', height: '100%', }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table stickyHeader aria-label="sticky table">
							<TableHead> 
								<TableRow>
									{data && data.columns.map((column, index) => (
										<TableCell
											style={{ minWidth: "200px", height: "40px" }}
											color={{ backgroundColor: "#c1bdbc" }}
											key={index}
										>
											{column}
											<IconButton style={{marginBottom: "3px"}} onClick={() => handleColumnAdd(column)}>
												<AddIcon />
											</IconButton>
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody sx={{backgroundColor: "#e7e5e4" }}>
								{data && data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, rowIndex) => {
										return (
											<TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
												{row.map((cell, cellIndex) => {
													return (
														<TableCell key={cellIndex}>
															{cell}
														</TableCell>
													)
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={data.rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
					</Paper>

					<Paper sx={{ width: '100%', height: '100%', }}>
						<TableContainer>
							<Table>
								<TableBody>
									<TableRow>
									{selectedColumn && (
										<>
										<TableCell>
											{selectedModelOptions.name}
										</TableCell>

										<TableCell>
											<FormControl variant="standard" sx={{width: "100px"}}>
												<InputLabel id="demo-simple-select-label">Operation</InputLabel>
													<Select
														// labelId="demo-simple-select-label"
														// id="demo-simple-select"
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
														<TextField type="number" label="Estimator" />
													)}
												</div>
												// <MenuItem value={col.name} key={index}>{col.name}</MenuItem>
											)}
										</TableCell>

										<TableCell>
											<TextField onChange={(e) => handleNameChange(e.target.value)} size="small" sx={{width:"300px"}} id="outlined-basic" variant="outlined" label="Name" />
										</TableCell>
										</>
									)}
								
							{/* <TableCell>
										{col.right}
									</TableCell>

									<TableCell>
										<TextField onChange={(e) => handleChange(e.target.value, index, "name")} size="small" sx={{width:"300px"}} id="outlined-basic" variant="outlined" />
									</TableCell>
									<TableCell>
										<IconButton onClick={() => handleCancelColumn(index)} sx={{color: "red"}}> 
											<ClearIcon />
										</IconButton>
									</TableCell> */}
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>

					</Paper>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Close</Button>
					{/* <Button onClick={() => handleSubmit()} color="primary" autoFocus >Submit</Button> */}
				</DialogActions>

			</Dialog>
    </Box>
  )
}
