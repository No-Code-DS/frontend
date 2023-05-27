import React, { useState, useEffect } from 'react'
import {
 Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography, Button, Stack,
} from "@mui/material";

import { Cookies } from 'react-cookie';
import classes from "../styles/dashboardStyles";
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
} from "react-router-dom";

const statusColors = {"Deployed": "green", "Failed": "red", "Training": "orange"}

export const Models = ({setProjectId}) => {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [projects, setProjects] = useState([]);
	const [description, setDescription] = useState("");
	const storedCookies = new Cookies();
  const tokenCookie = storedCookies.get("token");

  async function fetchProject(projectId="") {
    let url = "http://localhost:8000/projects/";
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
      const response = await fetch('http://localhost:8000/projects/create', {
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
                <Typography variant="h5" style={{fontWeight:"bold"}}>
                  {model.project_name}
                </Typography>
                <Typography>
                  {model.description}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography style={{ color: "#6c6c6c", fontWeight: "bold"}}>
                  Created at: <br/>
                  {model.created_at.replace("T", " ").split(".")[0]}
                </Typography>
                <Typography variant="h7" style={{ color: statusColors[model.status], fontWeight: "bold" }}>
                  <br/>
                  {/* {model.status} */}
                  {/* <Button>Open</Button> */}

                  <Button variant="contained" color="success">
                    <Link component={RouterLink} to='/dashboard' state={{"project": projects[index]}} sx={{color:"white"}}>
                      Open
                    </Link>
                  </Button>
                  
                </Typography>
              </Box>

            </Box>
          ))}
      </Box>
    </>
  )
}
