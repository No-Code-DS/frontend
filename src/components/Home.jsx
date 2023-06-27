import React from 'react'
import classes from "../styles/mainStyles";
import { Footer } from './Footer';
import { Box } from '@mui/material';
import data_animation from './svg/data_animation.svg';
import background from './svg/background.svg';

import {
		Typography,
		Stack,
		Button,
} from "@mui/material";

import Link from '@mui/material/Link';
import {
	Link as RouterLink,
} from "react-router-dom";

import Clean from "./Dashboard/icons/Clean";
import FeatureEngineeringIcon from "./Dashboard/icons/FeatureEngineeringIcon";
import ModelIcon from "./Dashboard/icons/ModelIcon";
import DeploymentIcon from "./Dashboard/icons/DemploymentIcon";

export const Home = () => {
	return (
		<Box sx={{...classes.mainContainer}}>
			<Box sx={{...classes.container}}>
				<Box sx={{...classes.welcomeWrapper}}>

						<Box sx={{...classes.textContainer}}>

							<Typography variant="h2" sx={{...classes.welcomeTextTop}} gutterBottom>
								Simplify Building <br/>
								Data Driven Solutions
							</Typography>
							<Typography variant="h5" sx={{...classes.welcomeTextBottom}} paragraph>
								Train AI models with full data science life cycle where you have control over every step of the process
							</Typography>
							<Box sx={{...classes.buttons}}>
								<Stack direction="row" spacing={2}>
									<Button variant="contained" style={{ backgroundColor: "#389AF4"}}> 
										<Link component={RouterLink} to="/login" sx={{padding: "5px 30px", fontSize: "1.2em", color:"#fff", textTransform: "none", textDecoration: "none"}}>
											Get Started
										</Link>
									</Button> 

									<Button variant="contained" style={{backgroundColor:"#fff"}}>
										<Link component={RouterLink} to="/pricing" sx={{ padding: "5px 30px", fontSize: "1.2em", color: "#5BB0FF", textTransform: "none", textDecoration: "none" }}>
											Learn More
										</Link>
									</Button>
								</Stack>
							</Box>

						</Box>

						<Box sx={{width: "50%"}}>
							<Box component="img" src={background} sx={{position: "absolute", top: 0, right: 0, width: "55%", zIndex: "-1"}}/>

							<Box component="img" src={data_animation} sx={{width: "100%"}}/>
						</Box>

				</Box>
			</Box>

			<Box style={{ marginTop: "35px", width: "100%"}} >
				<Box sx={{...classes.tutorial}} >
					<iframe width="760" height="385" src="https://www.youtube.com/embed/RBSUwFGa6Fk" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
					<Stack direction="column" alignItems="start" spacing={1} sx={{ width: "45%"}} >
						<Typography variant="h4" align="left" sx={{padding:"15px"}}>
							See what you can do with our tool
						</Typography>
						<Typography variant="h6" align="left" style={{ color: "#808080"}} sx={{padding:"15px"}}>
							See how No-Code tools can be used to build reliable and optimized data driven solutions with ease.
						</Typography>
					</Stack>
				</Box>
			</Box>
			<br />
			<br />

			<Box>
				<Typography variant="h3" align="center" sx={{margin: "80px"}}>
					Features
				</Typography>

				<Stack direction="row" justifyContent="space-between">
					<Box sx={{...classes.featureBox}}>
						<Box>
							<Clean style={{ margin: "auto", transform: 'scale(3)' }}color="#389AF4" />
						</Box>

						<Typography variant="h5" align="center" sx={{...classes.featureBoxTitle}}>
							Data Cleaning
						</Typography>

						<Typography paragraph sx={{color: "#808080"}}>
							Removing incorrect, corrupted, incorrectly formatted, duplicate, or incomplete data.
						</Typography>
					</Box>
					<Box sx={{...classes.featureBox}}>
						<Box>
							<FeatureEngineeringIcon style={{ margin: "auto", transform: 'scale(3)' }}color="#389AF4" />
						</Box>

						<Typography variant="h5" align="center" sx={{...classes.featureBoxTitle}}>
							Feature Engineering
						</Typography>

						<Typography paragraph sx={{color: "#808080"}}>
							Extract and transform raw data, such as price lists, product descriptions, and sales volumes so that you can use features for training and prediction.
						</Typography>
					</Box>
					<Box sx={{...classes.featureBox}}>
						<Box>
							<ModelIcon style={{ margin: "auto", transform: 'scale(3)' }}color="#389AF4" />
						</Box>
						<Typography variant="h5" align="center" sx={{...classes.featureBoxTitle}}>
							Model Selection
						</Typography>

						<Typography paragraph sx={{color: "#808080"}}>
							Select a model from among various candidates on the basis of performance criterion to choose the best one.
						</Typography>
					</Box>
					<Box sx={{...classes.featureBox}}>
						<Box>
							<DeploymentIcon  style={{ margin: "auto", transform: 'scale(3)' }}color="#389AF4" />
						</Box>

						<Typography variant="h5" align="center" sx={{...classes.featureBoxTitle}}>
							Deployment
						</Typography>

						<Typography paragraph sx={{color: "#808080"}}>
							Make model's predictions available to your users with just one click.
						</Typography>
					</Box>
				</Stack>
			</Box>
			
			<Footer />
		</Box> 
	)
}

