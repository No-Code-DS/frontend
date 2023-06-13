import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import FeatureEngineeringIcon from '../Dashboard/icons/FeatureEngineeringIcon';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem, TextField, BottomNavigation } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Cookies } from 'react-cookie';
import classes from '../../styles/processStyles';
import { getData, convertDataFormat } from './helperFunctions';

export const FeatureEngineering = ({dataSourceId, projectId, existingSelectedColumns=false}) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [data, setData] = useState({columns: [], rows: []});
	const [selectedColumns, setSelectedColumns] = useState([]);
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
  const [rowsPerPage, setRowsPerPage] = useState(10);

	function handleColumnAdd(columnName) {
		setSelectedColumns((prevState) => {
			const lastObject = prevState[prevState.length - 1];
			if (lastObject && lastObject.left && !lastObject.right) {
				return [
					...prevState.slice(0, -1),
					{ ...lastObject, right: columnName }
				];
			}
			else {
				return [
					...prevState,
					{
						left: columnName,
						right: 0,
						operation_symbol: 0,
						name: ""
					}
				];
			}
		});
	};

	function handleChange(value, index, field) {
		const updatedSelectedColumns = selectedColumns.map((col, index2) => {
			let newObj = col;
			if (index2 == index) {
				newObj[[field]] = value;
			}
			return newObj;
		});
		setSelectedColumns(updatedSelectedColumns);
	}
		
	function handleCancelColumn(index) {
		const updatedSelectedColumns = selectedColumns.filter((col, index2) => index2 !== index);
		setSelectedColumns(updatedSelectedColumns);
	}

	async function handleSubmit() {
    const jsonData = JSON.stringify(selectedColumns);
		const response = await fetch(`/api/projects/${projectId}/fe`, {
			method: "POST",
			headers: { 
				'Content-Type': 'application/json',
				'accepts': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			},
			body: jsonData,
		});
		let responseJson = await response.json();
		let formattedData = convertDataFormat(responseJson);
		setData(formattedData);
	}

	useEffect(() => {
		async function fetchData() {
			let jsonData = await getData(projectId, tokenCookie);
			setData(jsonData);
			if (existingSelectedColumns) {
				setSelectedColumns(existingSelectedColumns)
			}
		}
		fetchData();
	}, []);

  return (
    <Box sx={{...classes.processBox}}>
      <IconButton onClick={() => setOpen(true)}>
				<FeatureEngineeringIcon style={{ transform: 'scale(2.0)' }} />
			</IconButton>

      <Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.cleanDialogContainer}}>
				<DialogTitle sx={{...classes.title}}>Feature Engineering</DialogTitle>

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
							{/* <TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component="div"
								count={data.data.rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/> */}
					</Paper>
					
					<br/>

					<div>Click on the plus next to a column to select it</div>
					<Paper style={{marginTop: "10px"}}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table >
								<TableHead> 
									<TableRow>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Column 1 
										</TableCell>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Operation
										</TableCell>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Column 2
										</TableCell>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Name
										</TableCell>
									</TableRow>
								</TableHead>	

								<TableBody >
									{selectedColumns && selectedColumns.map((col, index) => (
											<TableRow key={index} tabIndex={-1}>
												<TableCell sx={{...classes.chosenColumn}}>
													{col.left}
												</TableCell>

												<TableCell>
													<FormControl variant="standard" sx={{width: "100px"}}>
														<InputLabel id="demo-simple-select-label">Operation</InputLabel>
															<Select
																labelId="demo-simple-select-label"
																id="demo-simple-select"
																value={selectedColumns[index].operation_symbol}
																onChange={(event) => {
																	handleChange(event.target.value, index, "operation_symbol");
																}}
															>
																{["+", "-", "*", "/"].map((op, index) => (
																	<MenuItem value={op} key={index}>{op}</MenuItem>
																))}
															</Select>
													</FormControl>
												</TableCell>

												<TableCell>
													{col.right}
												</TableCell>

												<TableCell>
													<TextField onChange={(e) => handleChange(e.target.value, index, "name")} size="small" sx={{width:"300px"}} id="outlined-basic" variant="outlined" />
												</TableCell>
												<TableCell>
													<IconButton onClick={() => handleCancelColumn(index)} sx={{color: "red"}}> 
														<ClearIcon />
													</IconButton>
												</TableCell>
											</TableRow>
									))}
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
