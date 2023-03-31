import React from 'react'
import { Box, Grid, Typography, Stack } from "@mui/material";
import useStyles from "../styles/dashboardStyles";

export const Models = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.topPanel}>Dashboard</Box>
      <Box className={classes.modelsContainer}>
        <Stack direction="row" spacing={7} className={classes.modelsGrid}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" className={classes.model}>
            <Box>
              <Typography variant="h5" style={{fontWeight:"bold"}}>
                Weather prediction
              </Typography>
              <Typography>
                Random forest
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography style={{ color: "#6c6c6c", fontWeight: "bold"}}>
                Created at: <br/>
                23-04-2023
              </Typography>
              <Typography variant="h7" style={{ color: "green", fontWeight: "bold" }}>
                <br/>
                Deployed
              </Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="space-between" className={classes.model}>
            <Box>
              <Typography variant="h5" style={{fontWeight:"bold"}}>
                House price prediction
              </Typography>
              <Typography>
                Random forest
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography style={{ color: "#6c6c6c", fontWeight: "bold"}}>
                Created at: <br/>
                23-04-2023
              </Typography>
              <Typography variant="h7" style={{ color: "orange", fontWeight: "bold" }}>
                <br/>
                Training
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  )
}
