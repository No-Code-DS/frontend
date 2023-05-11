import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import classes from '../../styles/processStyles';
import { Box } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Cookies } from 'react-cookie';

export const DataCleaning = ({data, setData, projectId}) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState({"operations":[]});
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
	const [cleaningOptions, setCleaningOptions] = useState()
	const cleaningOptionsValues = ["Duplicates", "Missing number", "Missing category", "Encode category", "Extract datetime", "Outliers"]

	async function getCleaningOptions() {
		const response = await fetch("http://localhost:8000/projects/cleaning_map", {
			headers: {
				'accepts': 'application/json',
				'Authorization': 'Bearer ' + tokenCookie.access_token,
			}
		});
		let jsonData = await response.json();
		setCleaningOptions(jsonData);
	}

	useEffect(() => {
		getCleaningOptions();
	}, []);

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

	function handleColumnAdd(columnName) {
		let newCol = {"column_subset": [
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
    setSelectedColumns(prev => ({...prev, "operations": [...prev.operations, newCol]}));
	}

	function handleOptionChange(option, index) {
		const updatedSelectedColumns = selectedColumns.operations.map((col, index2) => {
			let newObj = col;
			for (let i in col.config) {
				if (col.config[i] === "auto") {
					newObj.config[i] = false;
				}
				if (index2 == index) {
					newObj.config[option] =  "auto";
				}
			}
			return newObj;
		})
		let res = {"operations": updatedSelectedColumns};
		// console.log(updatedSelectedColumns[index])
		setSelectedColumns(res);
	}

	function handleOptionValueChange(index) {
		let obj = selectedColumns.operations[index].config;
		let key = Object.keys(obj).find(key => obj[key] != false && obj[key] !== 1.5);
		// key === "outliers_param" ? "outliers" : 
		console.log(selectedColumns.operations)
		return key;
	}

	function handleActionChange(action, index) {
		const updatedSelectedColumns = selectedColumns.operations.map((col, index2) => {
			let newObj = col;
			if (index === index2) {
				for (let i in col.config) {
					if (col.config[i] != false && col.config[i] != 1.5) {
						newObj.config[i] = action
					}
				}
			}
			return newObj;
		})
		setSelectedColumns({"operations": updatedSelectedColumns});
	}

	function handleActionValueChange(index) {
		let obj = selectedColumns.operations[index].config;
		let value = Object.values(obj).find(i => i !== false);
		return value;
	}

	function handleColumnCancel(columnName) {
		const updatedSelectedColumns = selectedColumns.filter(col => col.columnName !== columnName)
		setSelectedColumns(updatedSelectedColumns);
	}

	async function handleClean() {
		const dataToClean = {
			"data_source_id": data.dataSourceId,
		}

    const jsonData = JSON.stringify()
		try {
        const response = await fetch(`http://localhost:8000/projects/${projectId}/cleaning`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'accepts': 'application/json',
          },
          body: jsonData,
        });

        const responseData = await response.json();

      } catch (error) {
        console.error(error);
      }
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
									{data.data.columns.map((column, index) => (
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
								{data.data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
								count={data.data.rows.length}
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
										{selectedColumns.operations.map((col, index) => (
												<TableRow key={index} tabIndex={-1}>
													<TableCell sx={{...classes.chosenColumn}}>
														{col.column_subset[0]}
													</TableCell>

													<TableCell>
														<FormControl variant="standard" sx={{width: "100px"}}>
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
																	value={handleActionValueChange(index)}
																	onChange={(event) => {
																		handleActionChange(event.target.value, index);
																	}}
																	sx={{border:"none"}}
																>
																	{cleaningOptions[handleOptionValueChange(index)].map((op, index) => (
																		<MenuItem value={op} key={index}>{op}</MenuItem>
																	))}
																</Select>
														</FormControl>
													</TableCell>

													<TableCell>
														<IconButton onClick={() => handleColumnCancel(col.columnName)} sx={{color: "red"}}> 
															<ClearIcon />
														</IconButton>
													</TableCell>
												</TableRow>
											))
										} 

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
