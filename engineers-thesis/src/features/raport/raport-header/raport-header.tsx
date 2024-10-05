import { Grid2, Paper, Typography, useMediaQuery } from "@mui/material";
import { raportHeaderProps } from "../../../types/raport-header-props"
import React from "react";

const RaportHeader: React.FC<raportHeaderProps> = ({data}) => {
    const screenSize = useMediaQuery("(min-width:1025px)");

    return (
        <>
            <Grid2 size={screenSize ? 6 : 12}>
                <Paper elevation={3} sx={{
                background: "#101010",
                color: "aliceblue",
                padding: "10px",
                textAlign: "center",
                boxShadow: "1px 1px aliceblue"
                }}>
                    <Typography variant='h5' component='h5' id="section-name">
                        LOCATION
                    </Typography>
                    <Typography variant='h5' component='h5'>
                        Lat: {data.latitude}° | Lng: {data.longitude}°
                    </Typography>
                </Paper>
            </Grid2>

            <Grid2 size={screenSize ? 6 : 12}>
                <Paper elevation={3} sx={{
                    background: "#101010",
                    color: "aliceblue",
                    padding: "10px",
                    textAlign: "center",
                    boxShadow: "-1px 1px aliceblue"
                }}>
                    <Typography variant='h5' component='h5' id="section-name">
                        CODE
                    </Typography>
                    <Typography variant='h5' component='h5'>
                        {data.code}
                    </Typography>
                </Paper>
            </Grid2>
        </>
    );
}

export default RaportHeader;