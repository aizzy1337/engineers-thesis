import { Box, Button, Grid2, Paper, Typography, useMediaQuery } from "@mui/material";
import { raportHeaderProps } from "../../../types/raport-header-props"
import React from "react";
import generateGUID from "../../../utils/generateGuid";
import "./raport-header.css"

const RaportHeader: React.FC<raportHeaderProps> = ({data, callback}) => {
    const screenSize = useMediaQuery("(min-width:1025px)");

    const sendData = (guid: string) => {
        callback({
            longitude: data.longitude,
            latitude: data.latitude,
            code: guid
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const guid = generateGUID();
        sendData(guid);
    };

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
                        {data.latitude}° | {data.longitude}°
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
                        {(data.code === undefined) ?
                        <Box component="form" onSubmit={handleSubmit} >
                            <Button variant="contained" type="submit"  id="button-raport">
                                Save for later
                            </Button>
                        </Box> :
                        data.code}
                    </Typography>
                </Paper>
            </Grid2>
        </>
    );
}

export default RaportHeader;