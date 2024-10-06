import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid2, InputAdornment, Paper, TextField, Typography, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { raportPropertiesProps } from "../../../types/raport-properties-props";
import { useEffect, useState } from 'react';
import { windTurbineProperties } from '../../../types/wind-turbine-properties';
import { solarPanelProperties } from '../../../types/solar-panel-properties';
import { defaultWindTurbineProperties } from '../../../types/default-wind-turbine-properties';
import { defaultSolarPanelProperties } from '../../../types/default-solar-panel-properties';
import './raport-properties.css'
import React from 'react';

const RaportProperties: React.FC<raportPropertiesProps> = ({data, callback}) => {
    const screenSize = useMediaQuery("(min-width:1025px)");

    const [windTurbineProperties, setWindTurbineProperties] = useState<windTurbineProperties>(defaultWindTurbineProperties);
    const [solarPanelProperties, setSolarPanelProperties] = useState<solarPanelProperties>(defaultSolarPanelProperties);

    const sendData = () => {
        callback({windTurbine: windTurbineProperties as windTurbineProperties, solarPanel: solarPanelProperties as solarPanelProperties});
    };

    useEffect(() => {
        setWindTurbineProperties(data.windTurbine);
        setSolarPanelProperties(data.solarPanel);
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChangeWindTurbine = (field: keyof windTurbineProperties, isArray = false) => (event: any) => {
        const value = event.target.value;
        setWindTurbineProperties((prevData) => ({
          ...prevData,
          [field]: isArray ? value.split(',').map(Number) : parseFloat(value),
        }));
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleChangeSolarPanel = (field: keyof solarPanelProperties, isArray = false) => (event: any) => {
        const value = event.target.value;
        setSolarPanelProperties((prevData) => ({
          ...prevData,
          [field]: isArray ? value.split(',').map(Number) : parseFloat(value),
        }));
      };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        sendData();
    };

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
                      WIND TURBINE
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
                      <Box component="form" onSubmit={handleSubmit} id="properties-box">
                        <TextField
                          id="text-field"
                          label="Power"
                          fullWidth
                          margin="normal"
                          value={windTurbineProperties.power.join(',')}
                          onChange={handleChangeWindTurbine('power', true)}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">W</InputAdornment>,
                            },
                          }}
                        />
                        <TextField
                          id="text-field"
                          label="Wind Speed"
                          fullWidth
                          margin="normal"
                          value={windTurbineProperties.windSpeed.join(',')}
                          onChange={handleChangeWindTurbine('windSpeed', true)}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start"><sup>m</sup>&frasl;<sub>s</sub></InputAdornment>,
                            },
                          }}
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            id="text-field"
                            label="Minimum Operating Temperature"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={windTurbineProperties.T_MIN}
                            onChange={handleChangeWindTurbine('T_MIN')}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                              },
                            }}
                          />
                          <TextField
                            id="text-field"
                            label="Maximum Operating Temperature"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={windTurbineProperties.T_MAX}
                            onChange={handleChangeWindTurbine('T_MAX')}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                              },
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            id="text-field"
                            label="Minimum Operating Wind Speed"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={windTurbineProperties.V_MIN}
                            onChange={handleChangeWindTurbine('V_MIN')}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start"><sup>m</sup>&frasl;<sub>s</sub></InputAdornment>,
                              },
                            }}
                          />
                          <TextField
                            id="text-field"
                            label="Maximum Operating Wind Speed"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={windTurbineProperties.V_MAX}
                            onChange={handleChangeWindTurbine('V_MAX')}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start"><sup>m</sup>&frasl;<sub>s</sub></InputAdornment>,
                              },
                            }}
                          />
                        </Box>

                        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} id="button">
                          Submit
                        </Button>
                      </Box>
                    </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid2>

            <Grid2 size={screenSize ? 6 : 12}>
              <Paper elevation={3} sx={{
                background: "#101010",
                color: "aliceblue",
                padding: "20px",
                textAlign: "center",
                boxShadow: "-1px 1px aliceblue"
              }}>
                <Typography variant='h5' component='h5' id="section-name">
                    SOLAR PANEL
                </Typography>
                <Accordion slotProps={{ heading: { component: 'h5' } }} id="accordion">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon id="wind-icon"/>}
                        aria-controls="wind-properties-content"
                        id="wind-properties-header"
                        sx={{flexDirection: 'row-reverse'}}
                        >
                          <div id="div-accordion-right">PROPERTIES</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box component="form" onSubmit={handleSubmit} id="properties-box">
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          id="text-field"
                          label="Area"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.area}
                          onChange={handleChangeSolarPanel('area')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">m<sup>2</sup></InputAdornment>,
                            },
                          }}
                        />
                        <TextField
                          id="text-field"
                          label="Maximum Power"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.P_MAX}
                          onChange={handleChangeSolarPanel('P_MAX')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">W</InputAdornment>,
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          id="text-field"
                          label="Minimum Operating Temperature"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.T_MIN}
                          onChange={handleChangeSolarPanel('T_MIN')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                            },
                          }}
                        />
                        <TextField
                          id="text-field"
                          label="Maximum Operating Temperature"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.T_MAX}
                          onChange={handleChangeSolarPanel('T_MAX')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          id="text-field"
                          label="Efficiency at Standard Test Conditions"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.n_STC}
                          onChange={handleChangeSolarPanel('n_STC')}
                        />
                        <TextField
                          id="text-field"
                          label="Temperature Coefficient of Power at STC"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.B_STC}
                          onChange={handleChangeSolarPanel('B_STC')}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          id="text-field"
                          label="Temperature at Standard Test Conditions"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.T_STC}
                          onChange={handleChangeSolarPanel('T_STC')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                            },
                          }}
                        />
                        <TextField
                          id="text-field"
                          label="Nominal Operating Cell Temperature"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.T_NOCT}
                          onChange={handleChangeSolarPanel('T_NOCT')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                          id="text-field"
                          label="Standard Nominal Operating Cell Temperature"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.T_STD_NOCT}
                          onChange={handleChangeSolarPanel('T_STD_NOCT')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                            },
                          }}
                        />
                        <TextField
                          id="text-field"
                          label="Irradiance at NOCT"
                          fullWidth
                          margin="normal"
                          type="number"
                          value={solarPanelProperties.Irridance_NOCT}
                          onChange={handleChangeSolarPanel('Irridance_NOCT')}
                          slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start"><sup>W</sup>&frasl;<sub>m</sub><sup>2</sup></InputAdornment>,
                            },
                          }}
                        />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        id="text-field"
                        label="Irradiance at Standard Test Conditions"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={solarPanelProperties.Irridance_STC}
                        onChange={handleChangeSolarPanel('Irridance_STC')}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="start"><sup>W</sup>&frasl;<sub>m</sub><sup>2</sup></InputAdornment>,
                          },
                        }}
                      />
                      <TextField
                        id="text-field"
                        label="Amount of solar panels"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={solarPanelProperties.amount}
                        onChange={handleChangeSolarPanel('amount')}
                      />
                      </Box>
                      
                        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} id="button">
                          Submit
                        </Button>
                      </Box>
                    </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid2>
        </>
    );
}

export default RaportProperties;