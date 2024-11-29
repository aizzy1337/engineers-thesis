import { createTheme, Grid2, Paper, ThemeProvider, Typography, Tabs, Tab } from "@mui/material";
import { raportCharts, raportChartsProps } from "../../../types/raport-charts-props";
import React, { useEffect, useState } from "react";
import { BarChart, LineChart, pieArcLabelClasses, PieChart } from "@mui/x-charts";
import { getMonthlyPowerSums } from "../../../utils/getMonthlyPowerSums";

const RaportCharts: React.FC<raportChartsProps> = ({ data }) => {
    const [propsData, setPropsData] = useState<raportCharts>(data);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const theme = createTheme({ palette: { mode: "dark" } });

    const solarEnergyByAreaRaportPower = propsData.solarEnergyRaportByArea?.map(x => x.power) as number[];
    const solarEnergyByPeakRaportPower = propsData.solarEnergyRaportByPeak?.map(x => x.power) as number[];
    const windEnergyByCurveRaportPower = propsData.windEnergyRaportByCurve?.map(x => x.power) as number[];
    const windEnergyByAreaRaportPower = propsData.windEnergyRaportByArea?.map(x => x.power) as number[];

    const datetimes = propsData.windEnergyRaportByCurve?.map(x => new Date(x.datetime)) as Date[];

    const totalSolarEnergyByArea = solarEnergyByAreaRaportPower.reduce((acc, curr) => acc + curr, 0);
    const totalSolarEnergyByPeak = solarEnergyByPeakRaportPower.reduce((acc, curr) => acc + curr, 0);
    const totalWindEnergyByCurve = windEnergyByCurveRaportPower.reduce((acc, curr) => acc + curr, 0);
    const totalWindEnergyByArea = windEnergyByAreaRaportPower.reduce((acc, curr) => acc + curr, 0);

    const monthlySolarPowerByAreaSums = getMonthlyPowerSums(datetimes, solarEnergyByAreaRaportPower);
    const monthlySolarPowerByPeakSums = getMonthlyPowerSums(datetimes, solarEnergyByPeakRaportPower);
    const monthlyWindPowerByCurveSums = getMonthlyPowerSums(datetimes, windEnergyByCurveRaportPower);
    const monthlyWindPowerByAreaSums = getMonthlyPowerSums(datetimes, windEnergyByAreaRaportPower);

    const valueFormatter = (date: Date) =>
        date.toLocaleDateString("pl-PL", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
        });

    useEffect(() => {
        setPropsData(data);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [data, width]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Grid2 size={12}>
                <ThemeProvider theme={theme}>
                    <Paper
                        elevation={3}
                        sx={{
                            background: "#101010",
                            color: "aliceblue",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow: "1px 1px aliceblue",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant="h5" component="h5" id="section-name">
                            ENERGY PRODUCTION CHARTS
                        </Typography>

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            textColor="inherit"
                            indicatorColor="primary"
                            variant="fullWidth"
                            sx={{ marginTop: 4 }}
                        >
                            <Tab label="Solar Energy" />
                            <Tab label="Wind Energy" />
                            <Tab label="Comparison" />
                        </Tabs>

                        {selectedTab === 0 && (
                            <>
                                <Typography variant="h6" sx={{ marginTop: 4 }}>
                                    Daily Energy Production
                                </Typography>
                                <LineChart
                                    xAxis={[{ scaleType: "time", data: datetimes, label: "Day", valueFormatter }]}
                                    yAxis={[{ label: "Energy (kWh)" }]}
                                    series={[
                                        { label: "PV Output - Area and Efficency", data: solarEnergyByAreaRaportPower, showMark: false, color: "#FFC300"},
                                        { label: "PV Output - Peak Power", data: solarEnergyByPeakRaportPower, showMark: false, color: "#FF573370" }
                                    ]}
                                    height={400}
                                    width={width * 0.8}
                                />

                                <Typography variant="h6" component="h6" sx={{ marginTop: 4 }}>
                                    Monthly Energy Production
                                </Typography>
                                <BarChart 
                                    xAxis={[{scaleType: 'band', data: monthlySolarPowerByAreaSums.map(x => x.month), label: "Month"}]}
                                    yAxis={[{label: "Energy (kWh)"}]}
                                    series={[
                                        {label: "PV Output - Area and Efficency", data: monthlySolarPowerByAreaSums.map(x => x.totalPower), color: "#FFC300"},
                                        {label: "PV Output - Peak Power", data: monthlySolarPowerByPeakSums.map(x => x.totalPower), color: "#FF573370"}
                                    ]}
                                    height={400}
                                    width={width*0.8}
                                    tooltip={{trigger: 'axis'}}
                                />

                                <Typography variant="h6" sx={{ marginTop: 4 }}>
                                    Yearly Energy Distribution
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            arcLabel: item => `${item.value.toFixed(2)} kWh`,
                                            arcLabelMinAngle: 35,
                                            arcLabelRadius: "60%",
                                            data: [
                                                { label: "PV Output - Area and Efficency", value: totalSolarEnergyByArea, color: "#FFC30090" },
                                                { label: "PV Output - Peak Power", value: totalSolarEnergyByPeak, color: "#FF573370" },
                                            ],
                                            innerRadius: 30,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fontWeight: "bold",
                                        },
                                    }}
                                    height={300}
                                    width={width * 0.6}
                                />
                            </>
                        )}

                        {selectedTab === 1 && (
                            <>
                                <Typography variant="h6" sx={{ marginTop: 4 }}>
                                    Daily Energy Production
                                </Typography>
                                <LineChart
                                    xAxis={[{ scaleType: "time", data: datetimes, label: "Day", valueFormatter }]}
                                    yAxis={[{ label: "Energy (kWh)" }]}
                                    series={[
                                        { label: "Turbine Output - Power Curve", data: windEnergyByCurveRaportPower, showMark: false, color: "#4a68ff"},
                                        { label: "Turbine Output - Area and Efficency", data: windEnergyByAreaRaportPower, showMark: false, color: "#42426670" }
                                    ]}
                                    height={400}
                                    width={width * 0.8}
                                />

                                <Typography variant="h6" component="h6" sx={{ marginTop: 4 }}>
                                    Monthly Energy Production
                                </Typography>
                                <BarChart 
                                    xAxis={[{scaleType: 'band', data: monthlyWindPowerByCurveSums.map(x => x.month), label: "Month"}]}
                                    yAxis={[{label: "Energy (kWh)"}]}
                                    series={[
                                        {label: "Turbine Output - Power Curve", data: monthlyWindPowerByCurveSums.map(x => x.totalPower), color: "#4a68ff"},
                                        {label: "Turbine Output - Area and Efficency", data: monthlyWindPowerByAreaSums.map(x => x.totalPower), color: "#42426670"}
                                    ]}
                                    height={400}
                                    width={width*0.8}
                                    tooltip={{trigger: 'axis'}}
                                />

                                <Typography variant="h6" sx={{ marginTop: 4 }}>
                                    Yearly Energy Distribution
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            arcLabel: item => `${item.value.toFixed(2)} kWh`,
                                            arcLabelMinAngle: 35,
                                            arcLabelRadius: "60%",
                                            data: [
                                                { label: "Turbine Output - Power Curve", value: totalWindEnergyByCurve, color: "#4a68ff90" },
                                                { label: "Turbine Output - Area and Efficency", value: totalWindEnergyByArea, color: "#42426670" },
                                            ],
                                            innerRadius: 30,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fontWeight: "bold",
                                        },
                                    }}
                                    height={300}
                                    width={width * 0.6}
                                />
                            </>
                        )}

                        {selectedTab === 2 && (
                            <>
                                <Typography variant="h6" sx={{ marginTop: 4 }}>
                                    Average Total Energy Distribution
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            arcLabel: item => `${item.value.toFixed(2)} kWh`,
                                            arcLabelMinAngle: 35,
                                            arcLabelRadius: "60%",
                                            data: [
                                                { label: "Wind Energy", value: totalWindEnergyByCurve, color: "#4a68ff90" },
                                                { label: "Solar Energy", value: totalSolarEnergyByArea, color: "#FFC30090" },
                                            ],
                                            innerRadius: 30,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    sx={{
                                        [`& .${pieArcLabelClasses.root}`]: {
                                            fontWeight: "bold",
                                        },
                                    }}
                                    height={300}
                                    width={width * 0.6}
                                />
                            </>
                        )}
                    </Paper>
                </ThemeProvider>
            </Grid2>
        </>
    );
};

export default RaportCharts;
