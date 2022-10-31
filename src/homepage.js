import React from "react";
import { Box } from '@mui/material';

const Homepage = ({ user }) => {
    const color = user.type === "供應" ? "#FDF1EF" : "#E3F2FD";
    return (
        <Box
            sx={{
                height: 700,
                width: 1367,
                bgcolor: color,
                left: 73,
                top: 126,
                position: "fixed"
            }}>
            {
                user.type === "供應" ?
                    <img src={require("./small_component/RED.png")} alt="map" /> :
                    <img src={require("./small_component/BLUE.png")} alt="map" />
            }
            <img src={require("./small_component/RED.png")} alt="map" />
        </Box >
    )
}

export default Homepage;