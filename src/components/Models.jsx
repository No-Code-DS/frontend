import React, { useState, useEffect } from 'react'
import {
 Dialog, DialogTitle, DialogContent, TextField, Box, Typography, Button, Stack,
} from "@mui/material";

import { Cookies } from 'react-cookie';
import classes from "../styles/dashboardStyles";
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
} from "react-router-dom";

const statusColors = {"Deployed": "#02B940", "Failed": "#F43C3C", "Training": "#F8BA1B", "Cleaning": "#808080", "Trained": "#00FF57", "Empty": "#808080", "FE": "#808080"}

export const Models = ({setProjectId}) => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [projects, setProjects] = useState([]);
	const [description, setDescription] = useState("");
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");

  async function fetchProject(projectId="") {
    let url = "/api/projects/";
    // url += projectId;
    const response = await fetch(url, {
      headers: { 
				'Content-Type': 'application/json',
        'accepts': 'application/json',
        'Authorization': 'Bearer ' + tokenCookie.access_token,
      },
    });
    let jsonData = await response.json();

    setProjects(jsonData);
  }

  useEffect(() => {
    fetchProject()
  }, [])

  async function createProject() {
    const jsonData = JSON.stringify({"project_name": name, "description": description})
    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'accepts': 'application/json',
          'Authorization': 'Bearer ' + tokenCookie.access_token
        },
        body: jsonData,
      });
      if (response.ok) {
        const responseData = await response.json();
        setProjectId(responseData.id)
      }
      if (response.status == 409) {
        const responseData = await response.json();
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box sx={{...classes.topPanel}}>
        <Typography>
          Dashboard
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Create new model 
        </Button> 

        <Dialog open={open} maxWidth="lg" fullWidth={false} >
          <DialogTitle sx={{...classes.uploadTitle}}> New Project </DialogTitle>
              
          <DialogContent dividers sx={{...classes.uploadDialogContainer}} >
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant="h5">
                  Name:
                </Typography>

                <TextField size="small" sx={{width:"600px"}} id="outlined-basic" variant="outlined" onChange={(e) => setName(e.target.value)} />
              </Stack>

              <Stack spacing={1}>
                <Typography variant="h5">
                  Description:
                </Typography>

                <TextField size="small" sx={{width:"600px"}} id="outlined-basic" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
              </Stack>

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success">
                  <Link component={RouterLink} to="/dashboard" sx={{color:"white"}} onClick={() => createProject()}>
                    Create
                  </Link>
                </Button>
                <Button variant="outlined" color="error" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </DialogContent>       
        </Dialog>

      </Box>
      <Box sx={{...classes.modelsContainer}} >
          {projects.map((model, index) => (
            <Box sx={{...classes.model}} key={index} >
              <Box>
                <Link component={RouterLink} to='/dashboard' state={{"project": projects[index]}} sx={{textDecoration:"none"}}>
                  <Typography variant="h5" style={{fontWeight:"bold"}}>
                    {model.project_name}
                  </Typography>
                  <Typography>
                    {model.description}
                  </Typography>
                </Link>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography style={{ color: "#808080", fontWeight: "500"}}>
                  Created at: <br/>
                  {model.created_at.replace("T", " ").split(".")[0]}
                </Typography>

                <Typography variant="h7" style={{ color: statusColors[model.status], fontWeight: "bold" }}>
                  <br/>
                  <i class="fa-solid fa-circle"></i> {model.status}
                </Typography>
              </Box>

            </Box>
          ))}
      </Box>
    </>
  )
}
