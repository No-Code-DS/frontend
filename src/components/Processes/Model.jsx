import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import ModelIcon from '../Dashboard/icons/ModelIcon';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, FormControl, InputLabel, Select, MenuItem, TextField, BottomNavigation } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Cookies } from 'react-cookie';
import classes from '../../styles/processStyles';

export const Model = () => {
  const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
  const [rowsPerPage, setRowsPerPage] = useState(10);


  return (
    <Box sx={{...classes.processBox}}>
      <IconButton onClick={() => setOpen(true)}>
        <ModelIcon style={{ transform: 'scale(3.3)' }} />
      </IconButton>
      <Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.cleanDialogContainer}}>
				<DialogTitle sx={{...classes.title}}>Model</DialogTitle>

				<DialogContent dividers sx={{...classes.cleanWindowContainer}}>
					<Paper sx={{ width: '100%', height: '100%', }}>
						
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
