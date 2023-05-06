import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import classes from '../../styles/processStyles';
import { Box } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

export const DataCleaning = ({data, setData}) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState([]);

	useEffect(() => {
		console.log(selectedColumns)
	});

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	
	function handleTypeChange(columnName, type) {
		const updatedSelectedColumns = selectedColumns.map(col => {
			if (col.columnName === columnName) {
				return {...col, "cleaningType": type}
			}
			return col;
		})
		setSelectedColumns(updatedSelectedColumns);
		// console.log(selectedColumns)
	}

	function handleActionChange(columnName, action) {
		const updatedSelectedColumns = selectedColumns.map(col => {
			if (col.columnName === columnName) {
				return {...col, "cleaningAction": action}
			}
			return col;
		})
		setSelectedColumns(updatedSelectedColumns);
	}

	function handleColumnCancel(columnName) {
		const updatedSelectedColumns = selectedColumns.filter(col => col.columnName !== columnName)
		setSelectedColumns(updatedSelectedColumns);
		console.log("dsad")
	}

  return (
		<Box sx={{...classes.processBox}}>
			<IconButton onClick={() => setOpen(true)}>
				<Clean style={{ transform: 'scale(3.3)' }} />
			</IconButton>

			<Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.cleanDialogContainer}}>
				<DialogTitle sx={{...classes.title}}>Data</DialogTitle>

				<DialogContent dividers sx={{...classes.cleanWindowContainer}}>
					<Paper sx={{ width: '100%', height: '100%', }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table stickyHeader aria-label="sticky table">
							<TableHead> 
								<TableRow>
									{data.columns.map((column) => (
										<TableCell
											style={{ minWidth: "200px", height: "40px" }}
											color={{ backgroundColor: "#c1bdbc" }}
											key={column}
										>
											{column}
											{/* <IconButton style={{marginBottom: "3px"}} > */}
											<IconButton style={{marginBottom: "3px"}} onClick={() => {
												setSelectedColumns(prev => [...prev, {"columnName": column, "cleaningType": "Empty", "cleaningAction": "Delete"}])
											}}>
												<AddIcon />
											</IconButton>
										</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody sx={{backgroundColor: "#e7e5e4" }}>
								{data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
					
					<br/>

					<div>Click on the plus next to a column to select it</div>
					<Paper style={{marginTop: "10px"}}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table>
								<TableHead> 
									<TableRow>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Columns
										</TableCell>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Type
										</TableCell>
										<TableCell sx={{width:"33%"}} color={{ backgroundColor: "#c1bdbc" }}>
											Function
										</TableCell>
									</TableRow>
								</TableHead>	

								<TableBody >
										{selectedColumns.map((col, index) => {
											return (
												<TableRow key={index} tabIndex={-1}>
													<TableCell sx={{...classes.chosenColumn}}>
														{col.columnName}
													</TableCell>

													<TableCell>
														<FormControl variant="standard" sx={{width: "100px"}}>
															<InputLabel id="demo-simple-select-label">Type</InputLabel>
																<Select
																	labelId="demo-simple-select-label"
																	id="demo-simple-select"
																	value={selectedColumns.find(selectedCol => selectedCol.columnName == col.columnName).cleaningType}
																	// label="Age"
																	onChange={(event) => {
																		handleTypeChange(col.columnName, event.target.value);
																	}}
																>
																	<MenuItem value={"Empty"}>Empty</MenuItem>
																	<MenuItem value={"Outlier"}>Outlier</MenuItem>
																	{/* <MenuItem value={3}>Type 3</MenuItem> */}
																</Select>
														</FormControl>
													</TableCell>

													<TableCell>
														<FormControl variant="standard" sx={{width: "130px"}}>
															<InputLabel sx={{border:"none"}}id="demo-simple-select-label">Action</InputLabel>
																<Select
																	labelId="demo-simple-select-label"
																	id="demo-simple-select"
																	value={
																		selectedColumns.find(selectedCol => selectedCol.columnName == col.columnName).cleaningAction
																	}
																	onChange={(event) => {
																		handleActionChange(col.columnName, event.target.value);
																	}}
																	sx={{border:"none"}}
																>
																	<MenuItem value={"Delete"}>Delete</MenuItem>
																	<MenuItem value={"Mean"}>Mean</MenuItem>
																</Select>
														</FormControl>
													</TableCell>

													<TableCell>
														<IconButton onClick={() => handleColumnCancel(col.columnName)} sx={{color: "red"}}> 
															<ClearIcon />
														</IconButton>
													</TableCell>
												</TableRow>
											)
										})} 

								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Close</Button>
					<Button color="primary" autoFocus>Save changes</Button>
				</DialogActions>

			</Dialog>

		</Box>
  )
}
