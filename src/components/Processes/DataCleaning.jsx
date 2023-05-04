import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import classes from '../../styles/processStyles';
import { Box } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const DataCleaning = ({data, setData}) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState([]);

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	
	function addColumn() {
		let x = {"columnName": "das"};
		setSelectedColumns([...selectedColumns, x])
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
												setSelectedColumns(prev => [...prev, {"columnName": column}])
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

					<div>Click on the arrow next to a column to select it</div>
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
																	value={10}
																	label="Age"
																	// onChange={(event) => setCleaningType(event.target.value)}
																>
																	<MenuItem value={1}>Type 1</MenuItem>
																	<MenuItem value={2}>Type 2</MenuItem>
																	<MenuItem value={3}>Type 3</MenuItem>
																</Select>
														</FormControl>
													</TableCell>

													<TableCell>
														<FormControl variant="standard" sx={{width: "100px"}}>
															<InputLabel sx={{border:"none"}}id="demo-simple-select-label">Action</InputLabel>
																<Select
																	labelId="demo-simple-select-label"
																	id="demo-simple-select"
																	value={10}
																	label="Age"
																	// onChange={(event) => setCleaningType(event.target.value)}
																	sx={{border:"none"}}
																>
																	<MenuItem value={1}>Function 1</MenuItem>
																	<MenuItem value={2}>Function 2</MenuItem>
																	<MenuItem value={3}>Function 3</MenuItem>
																</Select>
														</FormControl>
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
