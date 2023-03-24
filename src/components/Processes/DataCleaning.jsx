import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Box, Dialog, DialogTitle, DialogContent, Typography  } from "@mui/material";
import { Modal } from '@mui/material';
import useStyles from '../../styles/processStyles';
import CloseIcon from '@material-ui/icons/Close';

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
          <Clean style={{ transform: 'scale(2.7)' }} />
      </IconButton>
			<Dialog open={open} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
				<DialogTitle className={classes.cleanWindowContainer}>
						<div style={{ display: 'flex' }}>
								<Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
									hi
								</Typography>
								<Controls.ActionButton
										color="secondary"
										onClick={()=>{setOpenPopup(false)}}>
										<CloseIcon />
								</Controls.ActionButton>
						</div>
				</DialogTitle>
				<DialogContent dividers>
						children
				</DialogContent>
			</Dialog>
		</>
  )
}
