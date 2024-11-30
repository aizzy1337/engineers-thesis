import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid2, Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import { weatherDataProps } from "../../../types/weather-data-props";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import '../raport-properties/raport-properties.css'
import { calculateYearlyGeneratedPower } from "../../../utils/fuzzy-model/calculateYearlySolarRadiation";
import { calculateFuzzySolarPotential, calculateFuzzyWindPotential } from "../../../utils/fuzzy-model/calculateFuzzyPotential";
import { convertPotentialToString } from "../../../utils/fuzzy-model/convertPotentialToString";
import { convertPotentialToColor } from "../../../utils/fuzzy-model/convertPotentialToColor";

const FuzzyLogicPotential: React.FC<weatherDataProps> = ({data}) => {
    const [roughness, setRoughness] = useState<number>(0);
    const [orientation, setOrientation] = useState<number>(180);
    const [shade, setShade] = useState<number>(0);

    const [windTurbinePotential, setWindTurbinePotential] = useState<string>();
    const [windTurbinePotentialColor, setWindTurbinePotentialColor] = useState<string>();

    const [solarPanelPotential, setSolarPanelPotential] = useState<string>();
    const [solarPanelPotentialColor, setSolarPanelPotentialColor] = useState<string>();

    const screenSize = useMediaQuery("(min-width:1025px)");
    const yearlySolarRadiation = calculateYearlyGeneratedPower(data.weatherConditions);
    const averageYearlyWindSpeed = data.weatherConditions.reduce((acc, curr) => acc + curr.windspeed / 3.6, 0) / data.weatherConditions.length;

    const handleSubmitWindTurbine = async (event: React.FormEvent) => {
        event.preventDefault();
        const potential = await calculateFuzzyWindPotential(averageYearlyWindSpeed, roughness);
        setWindTurbinePotential(
            convertPotentialToString(potential)
        );
        setWindTurbinePotentialColor(
            convertPotentialToColor(potential)
        )
    };

    const handleSubmitSolarPanel = async (event: React.FormEvent) => {
        event.preventDefault();
        const potential = await calculateFuzzySolarPotential(yearlySolarRadiation, orientation, shade);
        setSolarPanelPotential(
            convertPotentialToString(potential)
        );
        setSolarPanelPotentialColor(
            convertPotentialToColor(potential)
        )
    };

    useEffect(() => {
        const calculateWindPotential = async () => {
            const windPotential = await calculateFuzzyWindPotential(averageYearlyWindSpeed, roughness);
            setWindTurbinePotential(
                convertPotentialToString(windPotential)
            );
            setWindTurbinePotentialColor(
                convertPotentialToColor(windPotential)
            )
        }

        const calculateSolarPotential = async () => {
            const solarPotential = await calculateFuzzySolarPotential(yearlySolarRadiation, orientation, shade);
            setSolarPanelPotential(
                convertPotentialToString(solarPotential)
            );
            setSolarPanelPotentialColor(
                convertPotentialToColor(solarPotential)
            )
        }

        calculateWindPotential();
        calculateSolarPotential();
    }, []);

    return (
        <>
            <Grid2 size={screenSize ? 6 : 12}>
                <Paper elevation={3} sx={{
                    background: "#101010",
                    color: "aliceblue",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "1px 1px aliceblue"
                }}>
                    <Typography variant='h5' component='h5' id="section-name">
                        LOCATION POTENTIAL WIND TURBINE
                    </Typography>
                    <Accordion slotProps={{ heading: { component: 'h5' } }} id="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon id="solar-icon"/>}
                            aria-controls="solar-properties-content"
                            id="wind-properties-header"
                        >
                            PROPERTIES
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="form" onSubmit={handleSubmitWindTurbine} id="properties-box">
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        id="text-field"
                                        label="Roughness"
                                        fullWidth
                                        margin="normal"
                                        type="number"
                                        value={roughness}
                                        onChange={(event) => setRoughness(parseFloat(event.target.value))}
                                    />
                                </Box>
                                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} id="button">
                                    Submit
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Paper elevation={3} sx={{
                    background: `${windTurbinePotentialColor}`,
                    color: "#101010",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "1px 1px aliceblue",
                    margin: "20px"
                    }}>
                        <Typography variant='h5' component='h5' id="section-name">
                            {(windTurbinePotential === "") ? "Potential is being calculated..." : windTurbinePotential}
                        </Typography>
                    </Paper>
                </Paper>
            </Grid2>

            <Grid2 size={screenSize ? 6 : 12}>
                <Paper elevation={3} sx={{
                    background: "#101010",
                    color: "aliceblue",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "-1px -1px aliceblue"
                }}>
                    <Typography variant='h5' component='h5' id="section-name">
                        LOCATION POTENTIAL SOLAR PANEL
                    </Typography>
                    <Accordion slotProps={{ heading: { component: 'h5' } }} id="accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon id="solar-icon"/>}
                            aria-controls="solar-properties-content"
                            id="wind-properties-header"
                            sx={{flexDirection: 'row-reverse'}}
                        >
                            <div id="div-accordion-right">PROPERTIES</div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="form" onSubmit={handleSubmitSolarPanel} id="properties-box">
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                    id="text-field"
                                    label="Orientation"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={orientation}
                                    onChange={(event) => setOrientation(parseFloat(event.target.value))}
                                    />
                                    <TextField
                                    id="text-field"
                                    label="Shade"
                                    fullWidth
                                    margin="normal"
                                    type="number"
                                    value={shade}
                                    onChange={(event) => setShade(parseFloat(event.target.value))}
                                    />
                                </Box>
                                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} id="button">
                                    Submit
                            </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Paper elevation={3} sx={{
                    background: `${solarPanelPotentialColor}`,
                    color: "#101010",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "1px 1px aliceblue",
                    margin: "20px"
                    }}>
                        <Typography variant='h5' component='h5' id="section-name">
                            {(solarPanelPotential === "") ? "Potential is being calculated..." : solarPanelPotential}
                        </Typography>
                    </Paper>
                </Paper>
            </Grid2>
        </>
    );
}

export default FuzzyLogicPotential;