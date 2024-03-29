import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import classes from '../../styles/processStyles';
import { Box } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Cookies } from 'react-cookie';
import { getData, convertDataFormat } from './helperFunctions';

export const DataCleaning = ({ projectId, dataSourceId, existingSelectedColumns = false }) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [selectedColumns, setSelectedColumns] = useState({ operations: [] });
	const storedCookies = new Cookies();
	const tokenCookie = storedCookies.get("token");
	const [cleaningOptions, setCleaningOptions] = useState();
	const cleaningOptionsValues = ["Duplicates", "Missing number", "Missing category", "Encode category", "Extract datetime", "Outliers"];
	const [data, setData] = useState({ columns: [], rows: [] });

	async function handleClean() {
		const jsonData = JSON.stringify({ "data_source_id": dataSourceId, "operations": selectedColumns.operations });
		try {
			const response = await fetch(`/api/projects/${projectId}/cleaning`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'accepts': 'application/json',
					'Authorization': 'Bearer ' + tokenCookie.access_token,
				},
				body: jsonData,
			});

			const responseData = await response.json();
			setData(convertDataFormat(responseData));
			console.log(responseData)
		} catch (error) {
			console.error(error);
		}
	}

	async function getCleaningOptions() {
		const response = await fetch("/api/projects/cleaning_map", {
			headers: {
				'accepts': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			}
		});
		let jsonData = await response.json();
		setCleaningOptions(jsonData);
	}

	useEffect(() => {
		async function fetchData() {
			let jsonData = await getData(projectId, tokenCookie);
			setData(jsonData);
			if (existingSelectedColumns) {
				setSelectedColumns({ operations: [] })
			}
		}
		fetchData();
		getCleaningOptions();
		// console.log(selectedColumns)
	}, []);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function handleColumnAdd(columnName) {
		let newCol = {
			"column_subset": [
				columnName
			],
			"config": {
				"duplicates": "auto",
				"missing_num": false,
				"missing_categ": false,
				"encode_categ": false,
				"extract_datetime": false,
				"outliers": false,
				"outlier_param": 1.5
			}
		}
		setSelectedColumns(prev => ({ "operations": [...prev.operations, newCol] }));
	}

	function handleOptionChange(option, index) {
		const updatedSelectedColumns = selectedColumns.operations.map((col, index2) => {
			let newObj = col;
			if (index2 === index) {
				for (let i in col.config) {
					if (col.config[i] !== false) {
						newObj.config[i] = false;
					}
				}
				newObj.config[option] = "auto";
			}

			return newObj;
		})
		// console.log(updatedSelectedColumns[index])
		// setSelectedColumns(res);
		setSelectedColumns({ operations: updatedSelectedColumns });
	}

	function handleOptionValueChange(index) {
		let obj = selectedColumns.operations[index].config;
		let key = Object.keys(obj).find(key => obj[key] !== false && obj[key] !== 1.5);
		// key === "outliers_param" ? "outliers" : 
		return key;
	}

	function handleActionChange(action, index) {
		const updatedSelectedColumns = selectedColumns.operations.map((col, index2) => {
			let newObj = col;
			if (index === index2) {
				for (let i in col.config) {
					if (col.config[i] !== false && col.config[i] !== 1.5) {
						newObj.config[i] = action
					}
				}
			}
			return newObj;
		})
		setSelectedColumns({ operations: updatedSelectedColumns });
	}

	function handleActionValueChange(index) {
		let obj = selectedColumns.operations[index].config;
		let value = Object.values(obj).find(i => i !== false);
		return value;
	}

	function handleColumnCancel(columnName) {
		const updatedSelectedColumns = selectedColumns.operations.filter(col => col.column_subset[0] !== columnName)
		setSelectedColumns(prev => ({ ...prev, "operations": updatedSelectedColumns }));
	}

	return (
		<Box sx={{ ...classes.processBox }}>
			<IconButton onClick={() => setOpen(true)}>
				<Clean style={{ transform: 'scale(2.0)' }} />
			</IconButton>

			<Dialog open={open} maxWidth={false} fullWidth={true} sx={{ ...classes.cleanDialogContainer }}>
				<DialogTitle sx={{ ...classes.title }}>Data Cleaning</DialogTitle>

				<DialogContent dividers sx={{ ...classes.cleanWindowContainer }}>
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
												<IconButton style={{ marginBottom: "3px" }} onClick={() => handleColumnAdd(column)}>
													<AddIcon />
												</IconButton>
											</TableCell>
										))}
									</TableRow>
								</TableHead>

								<TableBody sx={{ backgroundColor: "#e7e5e4" }}>
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

					<br />

					<div>Click on the plus next to a column to select it</div>
					<Paper style={{ marginTop: "10px" }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell sx={{ width: "33%" }} color={{ backgroundColor: "#c1bdbc" }}>
											Columns
										</TableCell>
										<TableCell sx={{ width: "33%" }} color={{ backgroundColor: "#c1bdbc" }}>
											Type
										</TableCell>
										<TableCell sx={{ width: "33%" }} color={{ backgroundColor: "#c1bdbc" }}>
											Function
										</TableCell>
									</TableRow>
								</TableHead>

								<TableBody >
									{selectedColumns.operations.map((col, index) => (
										<TableRow key={index} tabIndex={-1}>
											<TableCell sx={{ ...classes.chosenColumn }}>
												{col.column_subset[0]}
											</TableCell>

											<TableCell>
												<FormControl variant="standard" sx={{ width: "100px" }}>
													<InputLabel id="demo-simple-select-label">Type</InputLabel>
													<Select
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														value={handleOptionValueChange(index)}
														onChange={(event) => {
															handleOptionChange(event.target.value, index);
														}}
													>
														{Object.keys(cleaningOptions).map((op, index) => (
															<MenuItem value={op} key={index}>{cleaningOptionsValues[index]}</MenuItem>
														))}
													</Select>
												</FormControl>
											</TableCell>

											<TableCell>
												<FormControl variant="standard" sx={{ width: "130px" }}>
													<InputLabel sx={{ border: "none" }} id="demo-simple-select-label">Action</InputLabel>
													<Select
														labelId="demo-simple-select-label"
														id="demo-simple-select"
														value={handleActionValueChange(index)}
														onChange={(event) => {
															handleActionChange(event.target.value, index);
														}}
														sx={{ border: "none" }}
													>
														{cleaningOptions[handleOptionValueChange(index)].map((op, index) => (
															<MenuItem value={op} key={index}>{op}</MenuItem>
														))}
													</Select>
												</FormControl>
											</TableCell>

											<TableCell>
												<IconButton onClick={() => handleColumnCancel(col.column_subset[0])} sx={{ color: "red" }}>
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
					<Button color="primary" autoFocus onClick={handleClean}>Clean</Button>
				</DialogActions>

			</Dialog>

		</Box>
	)
}
