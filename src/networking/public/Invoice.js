import React from "react";
import Local from './LocalComponent';
import { Box, Paper } from "@mui/material";
export default function Invoice() {
    return (
        <div>
            <Local />
            <Box component={Paper}></Box>
        </div>
    );
}