import React from 'react'
import classes from "../styles/mainStyles";
import { Footer } from './Footer';
import { Box } from '@mui/material';
import data_animation from './svg/data_animation.svg';

import {
		Container,
		Typography,
		Stack,
		Button,
} from "@mui/material";

import Link from '@mui/material/Link';
import {
	Link as RouterLink,
} from "react-router-dom";


export const Home = () => {
	return (
		<Box sx={{...classes.mainContainer}}>
			<Box sx={{...classes.container}}>
				<Container sx={{...classes.welcome}} >
					<div style={{textAlign: "center", height: "65vh", width: "100%"}}>
						<img src={data_animation} style={{maxWidth: "100%", maxHeight: "100%", }}/>
					</div>
					<Typography variant="h2" align="center" sx={{...classes.welcomeTextTop}} gutterBottom>
						Simplify Building Data Driven Solutions
					</Typography>
					<Typography variant="h5" align="center" sx={{...classes.welcomeTextBottom}} paragraph>
						Train AI models with full data science life cycle where you have control over every step of the process
					</Typography>
					<Box sx={{...classes.buttons}}>
					<Stack direction="row" justifyContent="center" spacing={2}>
						<Button variant="contained" color="primary">
								<Link component={RouterLink} to="/login" sx={{color:"black"}}>
										Get started 
								</Link>
						</Button> 

						<Button variant="outlined" sx={{color:"white", borderColor:"#6777bf"}}>
								<Link component={RouterLink} to="/pricing" sx={{ my: 1, mx: 1.5, color: "black", textTransform: "none" }}>
										Learn More
								</Link>
						</Button>
					</Stack>
					</Box>
				</Container>
			</Box>

			<Box style={{ marginTop: "35px", minHeight: "30vh"}} >
				<Container maxWidth="md" sx={{...classes.tutorial}} >
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
						<iframe title="tutorial" width="220" height="215" src="https://www.youtube.com/watch?v=RBSUwFGa6Fk"></iframe>
						<Typography variant="h5" align="center" paragraph>
								this tutorial will help you get started on the basics 
								of our platform
						</Typography>
					</Stack>
				</Container>
			</Box>
			
			<Footer />
		</Box> 
	)
}

