import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

export const Footer = () => {
  return (
    <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
                // border: "1px solid",
            }}
        >
        <Typography variant="h6">
            Footer
        </Typography>
    </Container>
    )
}
