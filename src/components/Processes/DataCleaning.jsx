import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import classes from '../../styles/processStyles';
import { Box } from '@mui/material';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

export const DataCleaning = ({data, setData}) => {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		// if (dataFetchedRef.current) return;
		// let curData = mockData;
		// for (let i = 0; i < data.rows.length; i++) {
		// 	curData.rows[i].push(uuid());
		// }
		// setData(curData);
		// dataFetchedRef.current = true;
		// console.log("useffect")
		console.log(data)
	}, [])

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	
	const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
		<Box sx={{...classes.processBox}}>
			<IconButton onClick={handleOpen}>
				<Clean style={{ transform: 'scale(3.3)' }} />
			</IconButton>

			<Dialog open={open} maxWidth={false} fullWidth={true} >
				<DialogTitle sx={{...classes.title}}>Data</DialogTitle>

				<DialogContent dividers sx={{...classes.cleanWindowContainer}}>
					<Paper sx={{ width: '100%', height: '100%' }}>
						<TableContainer sx={{ maxHeight: 440 }}>
							<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{data.columns.map((column) => (
										<TableCell
											key={column}
											// align={column.align}
											// style={{ minWidth: column.minWidth }}
										>
											{column}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, index) => {
										return (
											<TableRow hover role="checkbox" tabIndex={-1} key={row[row.length-1]}>
												{row.slice(0, row.length-1).map((cell) => {
													return (
														<TableCell key={row[row.length-1]+cell}>
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
				</DialogContent>

				<DialogActions>
					<Button onClick={() => handleClose(false)} color="primary">Close</Button>
					<Button color="primary" autoFocus>Save changes</Button>
				</DialogActions>

			</Dialog>

		</Box>
  )
}
