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

	const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	
  return (
		<Box sx={{...classes.processBox}}>
			<IconButton onClick={() => setOpen(true)}>
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
											// align={"middle"}
											style={{ minWidth: "200px" }}
										>
											{column}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{data.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row, rowIndex) => {
										return (
											<TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
												{row.slice(0, row.length-1).map((cell, cellIndex) => {
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
				</DialogContent>

				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">Close</Button>
					<Button color="primary" autoFocus>Save changes</Button>
				</DialogActions>

			</Dialog>

		</Box>
  )
}
