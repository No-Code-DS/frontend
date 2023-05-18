import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import FeatureEngineeringIcon from '../Dashboard/icons/FeatureEngineeringIcon';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Cookies } from 'react-cookie';
import classes from '../../styles/processStyles';

export const FeatureEngineering = ({dataSourceId, projectId}) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [data, setData] = useState({columns: [], rows: []});
	const operations = useState(["+", "-", "*", "/"]);
	const [selectedColumns, setSelectedColumns] = useState([1]);
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
  const [rowsPerPage, setRowsPerPage] = useState(10);

	function convertDataFormat(inputObj) {
		const entries = Object.entries(inputObj);
		const columns = entries.map(([key, value]) => key);
		const rows = entries[0][1].map((_, rowIndex) => entries.map(([_, value]) => value[rowIndex]));
		return { columns, rows };
	}

	function handleColumnAdd(columnName) {
		setSelectedColumns((prevState) => {
			const lastObject = prevState[prevState.length - 1];
			if (lastObject.left && !lastObject.right) {
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
						right: "",
						operation_symbol: "",
						name: ""
					}
				];
			}
		});
	};

	async function getData() {
		console.log(projectId)
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

	useEffect(() => {
		getData();
	}, []);

  return (
    <Box sx={{...classes.processBox}}>
      <IconButton onClick={() => setOpen(true)}>
				<FeatureEngineeringIcon style={{ transform: 'scale(3.3)' }} />
			</IconButton>

      <Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.cleanDialogContainer}}>
				<DialogTitle sx={{...classes.title}}>Data</DialogTitle>

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
							<Table>
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
									</TableRow>
								</TableHead>	

								<TableBody >
									{selectedColumns.map((col, index) => (
											<TableRow key={index} tabIndex={-1}>
												<TableCell sx={{...classes.chosenColumn}}>
													{/* {col} */}
												</TableCell>

												<TableCell>
													<FormControl variant="standard" sx={{width: "100px"}}>
														<InputLabel id="demo-simple-select-label">Operation</InputLabel>
															<Select
																labelId="demo-simple-select-label"
																id="demo-simple-select"
																value={"+"}
																// onChange={(event) => {
																// 	handleOptionChange(event.target.value, index);
																// }}
															>
																{["+", "-", "*", "/"].map((op, index) => (
																	<MenuItem value={op} key={index}>{op}</MenuItem>
																))}
															</Select>
													</FormControl>
												</TableCell>

												<TableCell>
													
												</TableCell>

												<TableCell>
													{/* <IconButton onClick={() => handleColumnCancel(col.columnName)} sx={{color: "red"}}> 
														<ClearIcon /> */}
													{/* </IconButton> */}
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
					<Button color="primary" autoFocus >Clean</Button>
				</DialogActions>

			</Dialog>
    </Box>
  )
}
