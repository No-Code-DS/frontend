import React from 'react'
import Typography from '@mui/material/Typography';
import { Container, Stack } from '@mui/material';
import Link from '@mui/material/Link';
import {
	Link as RouterLink,
} from "react-router-dom";

export const Footer = () => {
  return (
    <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [2, 4],
                // border: "1px solid",
            }}
        >
        <Stack direction="row" spacing={4} justifyContent={"center"}>
            <Stack>
                <Typography variant="h6">
                    Data Lume
                </Typography>
                <Typography variant="h7">
                    Simplify Building Data Driven Solutions
                </Typography>
                <Typography variant="h7">
                    ©2023 Data Lume, Inc.
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="h6">
                    Resources
                </Typography>
                <Link component={RouterLink} to="/login" >
                    Get Started
                </Link>
                <Link component={RouterLink} to="/prices" >
                    Pricing
                </Link>
            </Stack>
        </Stack>
    </Container>
    )
}
