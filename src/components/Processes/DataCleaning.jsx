import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Clean from '../Dashboard/icons/Clean';
import { Box } from "@mui/material";
import { Modal } from '@mui/material';
import useStyles from '../../styles/processStyles';

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
			{open && (
        <Box className={classes.cleanWindowContainer}>
            <h2>Popup Title</h2>
            <p>Popup Content</p>
            <button onClick={handleClose}>Close Popup</button>
        </Box>
      )}
    </>
  )
}
