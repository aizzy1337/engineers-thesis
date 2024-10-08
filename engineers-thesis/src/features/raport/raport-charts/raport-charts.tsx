import { createTheme, Grid2, Paper, ThemeProvider, Typography} from "@mui/material";
import { raportCharts, raportChartsProps } from "../../../types/raport-charts-props";
import React, { useEffect, useState } from "react";
import { BarChart, LineChart, pieArcLabelClasses, PieChart} from "@mui/x-charts";

const RaportCharts: React.FC<raportChartsProps> = ({data}) => {
    const [propsData, setPropsData] = useState<raportCharts>(data);
    const solarEnergyRaportPower = (propsData.solarEnergyRaport?.map(x => x.power*24/1000) as number[]);
    const windEnergyRaportDatetime = (propsData.windEnergyRaport?.map(x => new Date(x.datetime)) as Date[]);
    const windEnergyRaportPower = (propsData.windEnergyRaport?.map(x => x.power*24/1000) as number[]);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const totalSolarEnergy = solarEnergyRaportPower.reduce((acc, curr) => acc + curr, 0);
    const totalWindEnergy = windEnergyRaportPower.reduce((acc, curr) => acc + curr, 0);

    const getMonthlyPowerSums = (date: Date[], power: number[]): { month: string, totalPower: number }[] => {
        const monthlyPowerMap: Record<string, number> = {};
      
        date.forEach((date, index) => {
          const monthKey = date.toLocaleDateString('pl-PL', {
            year: '2-digit',
            month: '2-digit'
        });
          
          if (monthlyPowerMap[monthKey]) {
            monthlyPowerMap[monthKey] += power[index];
          } else {
            monthlyPowerMap[monthKey] = power[index];
          }
        });
      
        const monthlyPowerSums = Object.keys(monthlyPowerMap).map(month => ({
          month,
          totalPower: monthlyPowerMap[month]
        }));
      
        return monthlyPowerSums;
      };

    const monthlyWindPowerSums = getMonthlyPowerSums(windEnergyRaportDatetime, windEnergyRaportPower);
    const monthlySolarPowerSums = getMonthlyPowerSums(windEnergyRaportDatetime, solarEnergyRaportPower);

    const theme = createTheme({ palette: { mode: 'dark' } });

    const valueFormatter = (date: Date) =>
        date.toLocaleDateString('pl-PL', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        });

    useEffect(() => {
        setPropsData(data);
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [data, width]);

    return (                                                                                                                                                      
        <>
            <Grid2 size={12}>
            <ThemeProvider theme={theme}>
                <Paper elevation={3} sx={{
                    background: "#101010",
                    color: "aliceblue",
                    padding: "20px",
                    textAlign: "center",
                    boxShadow: "1px 1px aliceblue",
                    marginBottom: "20px"
                }}>
                    <Typography variant='h5' component='h5' id="section-name">
                        ENERGY CHART
                    </Typography>
                    
                    <Typography variant="h6" component="h6" sx={{ marginTop: 4 }}>
                        Daily Energy Distribution
                    </Typography>
                    <LineChart
                        xAxis={[{scaleType:'time', data: windEnergyRaportDatetime, label: "Day", valueFormatter}]}
                        yAxis={[{label: "Energy (kWh)"}]}
                        series={[{label: "Wind Energy", data: windEnergyRaportPower, showMark: false, color: "#4a68ff"}, {label: "Solar Energy", data: solarEnergyRaportPower, showMark: false, color: "#fff74a"}]}
                        height={400}
                        width={width*0.8}
                        tooltip={{trigger: 'axis'}}
                    />

                    <Typography variant="h6" component="h6" sx={{ marginTop: 4 }}>
                        Monthly Energy Distribution
                    </Typography>
                    <BarChart 
                        xAxis={[{scaleType: 'band', data: monthlyWindPowerSums.map(x => x.month), label: "Month"}]}
                        yAxis={[{label: "Energy (kWh)"}]}
                        series={[{label: "Wind Energy", data: monthlyWindPowerSums.map(x => x.totalPower), color: "#4a68ff"}, {label: "Solar Energy", data: monthlySolarPowerSums.map(x => x.totalPower), color: "#fff74a"}]}
                        height={400}
                        width={width*0.8}
                        tooltip={{trigger: 'axis'}}
                    />

                    <Typography variant="h6" component="h6" sx={{ marginTop: 4 }}>
                        Total Energy Distribution
                    </Typography>
                    <PieChart
                        series={[{
                                arcLabel: (item) => `${item.value.toFixed(2)} kWh`,
                                arcLabelMinAngle: 35,
                                arcLabelRadius: '60%',
                                data: [
                                { label: "Wind Energy", value: totalWindEnergy, color: "#007cff90" },
                                { label: "Solar Energy", value: totalSolarEnergy, color: "#f8ff0080" },
                                ],
                                innerRadius: 30,
                                paddingAngle: 5,
                                cornerRadius: 5
                        },]}
                        sx={{
                            [`& .${pieArcLabelClasses.root}`]: {
                              fontWeight: 'bold',
                            },
                          }}
                        height={300}
                        width={width * 0.6}
                        />
                </Paper>
            </ThemeProvider>
            </Grid2>
        </>
    );
}

export default RaportCharts;