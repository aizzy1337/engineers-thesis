import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, Grid2, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { raportPropertiesProps } from "../../../types/raport-properties-props";
import { useEffect, useState } from 'react';
import { windTurbineProperties } from '../../../types/wind-turbine-properties';
import { solarPanelProperties } from '../../../types/solar-panel-properties';
import { defaultWindTurbineProperties } from '../../../types/default-wind-turbine-properties';
import { defaultSolarPanelProperties } from '../../../types/default-solar-panel-properties';
import './raport-properties.css'
import React from 'react';
import { Add, Delete } from '@mui/icons-material';

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

    const handleFieldChange = (
        field: keyof windTurbineProperties,
        index: number,
        value: number
      ) => {
        const updatedArray = [...windTurbineProperties[field] as number[]];
        updatedArray[index] = value;
        handleChangeWindTurbine(field, true)({
          target: { value: updatedArray.join(",") },
        });
      };
    
    const handleAddField = () => {
        const newWindSpeed = [...(windTurbineProperties.windSpeed || []), 0];
        const newPower = [...(windTurbineProperties.power || []), 0];
        handleChangeWindTurbine("windSpeed", true)({
          target: { value: newWindSpeed.join(",") },
        });
        handleChangeWindTurbine("power", true)({
          target: { value: newPower.join(",") },
        });
      };
    
    const handleRemoveField = (index: number) => {
        const newWindSpeed = (windTurbineProperties.windSpeed || []).filter((_, i) => i !== index);
        const newPower = (windTurbineProperties.power || []).filter((_, i) => i !== index);
        handleChangeWindTurbine("windSpeed", true)({
          target: { value: newWindSpeed.join(",") },
        });
        handleChangeWindTurbine("power", true)({
          target: { value: newPower.join(",") },
        });
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
                      <Accordion sx={{ mt: 2 }} id="accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="wind-speed-power-content"
                          id="wind-speed-power-header"
                        >
                          <Typography>
                            Wind Speed and Power
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {(windTurbineProperties.windSpeed || []).map((speed, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1,
                                flexWrap: "wrap",
                              }}
                            >
                            <TextField
                              id={`wind-speed-${index}`}
                              label="Wind Speed"
                              variant="outlined"
                              size="small"
                              type="number"
                              sx={{ flex: 1 }}
                              slotProps={{
                                input: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <sup>m</sup>&frasl;<sub>s</sub>
                                    </InputAdornment>
                                  ),
                                }
                              }}
                              value={speed}
                              onChange={(e) =>
                                handleFieldChange("windSpeed", index, parseFloat(e.target.value) || 0)
                              }
                            />
                            <TextField
                              id={`power-${index}`}
                              label="Power"
                              variant="outlined"
                              size="small"
                              type="number"
                              sx={{ flex: 1 }}
                              slotProps={{
                                input: {
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      W
                                    </InputAdornment>
                                  ),
                                }
                              }}
                              value={(windTurbineProperties.power || [])[index] || ""}
                              onChange={(e) =>
                                handleFieldChange("power", index, parseFloat(e.target.value) || 0)
                              }
                            />
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleRemoveField(index)}
                              disabled={(windTurbineProperties.windSpeed || []).length === 1}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                            </Box>
                          ))}
                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button
                              startIcon={<Add />}
                              variant="outlined"
                              size="small"
                              onClick={handleAddField}
                              sx={{color: 'black', border: 'black'}}
                            >
                              Add Pair
                            </Button>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
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
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <TextField
                            id="text-field"
                            label="Diameter of Propellers"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={windTurbineProperties.diameter}
                            onChange={handleChangeWindTurbine('diameter')}
                            slotProps={{
                              input: {
                                startAdornment: <InputAdornment position="start">m</InputAdornment>,
                              },
                            }}
                          />
                          <TextField
                            id="text-field"
                            label="System Loss"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={windTurbineProperties.systemLoss}
                            onChange={handleChangeWindTurbine('systemLoss')}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                          <FormControl fullWidth>
                            <InputLabel id="turbine-selector-label">Type of Wind Turbine</InputLabel>
                            <Select
                              labelId="turbine-selector-label"
                              value={windTurbineProperties.efficiency}
                              onChange={handleChangeWindTurbine('efficiency')}
                            >
                              <MenuItem value={0.45}>Turbine with 2 blades</MenuItem>
                              <MenuItem value={0.425}>Turbine with 3 blades</MenuItem>
                              <MenuItem value={0.3}>Multi-bladed turbine</MenuItem>
                              <MenuItem value={0.35}>Darrieus turbine</MenuItem>
                              <MenuItem value={0.2}>Savonius turbine</MenuItem>
                            </Select>
                          </FormControl>
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
                      <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        id="text-field"
                        label="Slope of a Panel"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={solarPanelProperties.slope}
                        onChange={handleChangeSolarPanel('slope')}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="start"><sup>o</sup></InputAdornment>,
                          },
                        }}
                      />
                      <TextField
                        id="text-field"
                        label="Azimuth of a Panel"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={solarPanelProperties.azimuth}
                        onChange={handleChangeSolarPanel('azimuth')}
                        slotProps={{
                          input: {
                            startAdornment: <InputAdornment position="start"><sup>o</sup></InputAdornment>,
                          },
                        }}
                      />
                      </Box>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                      <TextField
                        id="text-field"
                        label="System Loss"
                        fullWidth
                        margin="normal"
                        type="number"
                        value={solarPanelProperties.systemLoss}
                        onChange={handleChangeSolarPanel('systemLoss')}
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