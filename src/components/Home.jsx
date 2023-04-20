import React from 'react'
import classes from "../styles/mainStyles";
import { Footer } from './Footer';
import { Box } from '@mui/material';

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
				<Container maxWidth="sm" sx={{...classes.welcome}} >
					<Typography variant="h2" align="center" sx={{color:"white"}} gutterBottom>
							No-Code data science platform
					</Typography>
					<Typography variant="h5" align="center" sx={{color:"white"}} paragraph>
							Welcome to your data-driven solution. 
					</Typography>
					<Box sx={{...classes.buttons}}>
					<Stack direction="row" justifyContent="center" spacing={2}>
						<Button variant="contained" color="primary">
								<Link component={RouterLink} to="/login" sx={{color:"white"}}>
										Get started 
								</Link>
						</Button> 

						<Button variant="outlined" sx={{color:"white", borderColor:"#6777bf"}}>
								<Link component={RouterLink} to="/pricing" sx={{ my: 1, mx: 1.5, color: "white", textTransform: "none" }}>
										Learn More
								</Link>
						</Button>
					</Stack>
					</Box>
				</Container>
			</Box>

			<Box sx={{...classes.container}} style={{ marginTop: "20px" }} >
				<Container maxWidth="sm" sx={{...classes.tutorial}} >
					<Stack direction="row" justifyContent="center" spacing={2} >
						<iframe title="tutorial" width="220" height="215" src="https://www.youtube.com/watch?v=RBSUwFGa6Fk"></iframe>
						<Typography variant="h5" align="center" sx={{color:"white"}} paragraph>
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

