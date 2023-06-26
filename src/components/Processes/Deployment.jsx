import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeploymentIcon from '../Dashboard/icons/DemploymentIcon';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { Box, Paper, Table, TableRow, TableBody, TableCell, TableContainer} from '@mui/material';
import { Cookies } from 'react-cookie';
import classes from '../../styles/processStyles';
import CopyToClipboardButton from "./CopyToClipboardBtn";

export const Deployment = ({projectId}) => {
  const [open, setOpen] = useState(false);
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");
  const [apiLink, setApiLink] = useState('');

  async function getLink() {
    const res = await fetch(`/api/projects${projectId}/deploy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': 'Bearer ' + tokenCookie.access_token,
      },
    });
    let jsonData = await res.json();
    let address = window.location.hostname + jsonData.url;
    setApiLink(address);
  }

  useEffect(() => {
    getLink();
	}, [])	

  return (
    <Box sx={{...classes.processBox}}>
      <IconButton onClick={() => setOpen(true)}>
        <DeploymentIcon style={{ transform: 'scale(2.0)' }} />
      </IconButton>
      <Dialog open={open} maxWidth={false} fullWidth={true} sx={{...classes.deploymentDialogContainer}}>
				<DialogTitle sx={{...classes.title}}></DialogTitle>
				<DialogContent dividers sx={{...classes.deploymentWindowContainer}}>
					<Paper sx={{ width: '100%', height: '100%' }}>
            <Box sx={{...classes.deploymentWindow}}>
              <Typography variant="h5">Here's your deployed model:</Typography>
              <Box>
                <Typography variant="h7">{apiLink ? apiLink : null}</Typography>
                <CopyToClipboardButton content={apiLink} />
              </Box>
            </Box>
					</Paper>
				</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">Close</Button> 
        </DialogActions>

			</Dialog>
    </Box>
  )
}
