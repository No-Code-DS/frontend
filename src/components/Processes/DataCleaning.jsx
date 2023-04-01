import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Typography, Button, Container } from "@mui/material";
import { Modal } from '@mui/material';
import useStyles from '../../styles/processStyles';
import CloseIcon from '@mui/icons-material/Close';
import { 
	Table, TableBody, 
	TableContainer, TableRow,  
	Paper, TableHead,
	TableCell
} from '@mui/material';

export const DataCleaning = () => {
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
	<>
	<IconButton onClick={handleOpen}>
		<Clean style={{ transform: 'scale(3.3)' }} />
	</IconButton>
	<Dialog open={open} maxWidth={false} fullWidth={false}>
		<DialogTitle className={classes.title}>Dialog Box Title</DialogTitle>

		<DialogContent dividers className={classes.cleanWindowContainer}>
			<div>
				<TableContainer component={Paper} PaperProps={{ style: { backgroundColor: '#F5F5F5 !important' } }}>
					<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>title</TableCell>
								<TableCell align="right">tempcell</TableCell>
								<TableCell align="right">tempcell</TableCell>
								<TableCell align="right">tempcell</TableCell>
								<TableCell align="right">tempcell</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">temp</TableCell>
								<TableCell align="right">param1</TableCell>
								<TableCell align="right">param2</TableCell>
								<TableCell align="right">param3</TableCell>
								<TableCell align="right">param4</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>

				<Container>
					Parameters
				</Container>
			</div>
			<Button onClick={() => handleClose(false)} color="primary"></Button>
			<Button color="primary" autoFocus></Button>
		</DialogContent>

		<DialogActions>
			<Button onClick={() => handleClose(false)} color="primary">Close</Button>
			<Button color="primary" autoFocus>Save changes</Button>
		</DialogActions>
	</Dialog>
	</>
  )
}
