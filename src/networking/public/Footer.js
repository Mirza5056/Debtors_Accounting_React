import { Box, Typography } from "@mui/material";
import React from "react";
import "./styles/Footer.css";
const Footer=()=>{
    return (
        <Box>
            <Typography className="footer" sx={{position : 'fixed',width : '100%',bottom : '0px',backgroundColor : 'var(--background-color-main)',color: 'var(--background-text-color)',textAlign : 'right',padding : '0.2rem',fontSize :  '0.9rem',fontWeight : 'bold'}}>
                &copy;{new Date().getFullYear()} Accounting. All rights reserved.
            </Typography>
        </Box>
    );
};
export default Footer;