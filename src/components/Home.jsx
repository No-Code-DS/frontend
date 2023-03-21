import React from 'react'
import useStyles from "../styles/mainStyles";
import { Footer } from './Footer';

import {
    Container,
    Typography,
    Stack,
    Button,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import {
  Link as RouterLink,
} from "react-router-dom";


export const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
        <div className={classes.container} >
            <Container maxWidth="sm" className={classes.welcome} >
                <Typography variant="h2" align="center" sx={{color:"white"}} gutterBorrom>
                    No-Code data science platform
                </Typography>
                <Typography variant="h5" align="center" sx={{color:"white"}} paragraph>
                    Welcome to your data-driven solution. 
                </Typography>
                <div className={classes.buttons}>
                    <Stack direction="row" justifyContent="center" spacing={2}>
                        <Button variant="contained" color="primary">
                            Get Started
                        </Button>

                        <Button variant="outlined" sx={{color:"white", borderColor:"#6777bf"}}>
                            <Link component={RouterLink} to="/pricing" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
                                Learn More
                            </Link>
                        </Button>
                    </Stack>
                </div>
            </Container>
        </div>

        <div className={classes.container} style={{ marginTop: "20px" }} >
            <Container maxWidth="sm" className={classes.tutorial} >
                <Stack direction="row" justifyContent="center" spacing={2} >
                    <iframe width="220" height="215" src="https://www.youtube.com/watch?v=RBSUwFGa6Fk"></iframe>
                    <Typography variant="h5" align="center" sx={{color:"white"}} paragraph>
                        this tutorial will help you get started on the basics 
                        of our platform
                    </Typography>
                </Stack>
            </Container>
        </div>
      
        <Footer />
    </div> 
  )
}

