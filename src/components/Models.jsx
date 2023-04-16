import React from 'react'
import { Box, Typography, Button } from "@mui/material";
import classes from "../styles/dashboardStyles";
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
} from "react-router-dom";

const models = [
  {
    "name": "Weather prediction",
    "type": "Random forest",
    "date": "23-4-2023",
    "status": "Deployed"
  },
  {
    "name": "House price prediction",
    "type": "Linear regression",
    "date": "23-4-2023",
    "status": "Training"
  },
  {
    "name": "Weather prediction 2",
    "type": "Random forest",
    "date": "23-4-2023",
    "status": "Deployed"
  },
  {
    "name": "Weather prediction",
    "type": "Linear regresion",
    "date": "23-4-2023",
    "status": "Failed"
  },
]

const statusColors = {"Deployed": "green", "Failed": "red", "Training": "orange"}

export const Models = () => {

  return (
    <>
      <Box sx={{...classes.topPanel}}>
        <Typography>
          Dashboard
        </Typography>
        <Button variant="contained">
          <Link component={RouterLink} to="/dashboard" sx={{color:"white"}}>
            Create new model 
          </Link>
        </Button> 
      </Box>
      <Box sx={{...classes.modelsContainer}}>
          {models.map((model, index) => (
            <Box sx={{...classes.model}} key={index}>

              <Box>
                <Typography variant="h5" style={{fontWeight:"bold"}}>
                  {model.name}
                </Typography>
                <Typography>
                  {model.type}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography style={{ color: "#6c6c6c", fontWeight: "bold"}}>
                  Created at: <br/>
                  {model.date}
                </Typography>
                <Typography variant="h7" style={{ color: statusColors[model.status], fontWeight: "bold" }}>
                  <br/>
                  {model.status}
                </Typography>
              </Box>

            </Box>
          ))}
      </Box>
    </>
  )
}
