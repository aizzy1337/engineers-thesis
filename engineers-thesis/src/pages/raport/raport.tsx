import { useState } from 'react';
import './raport.css'
import { energyRaport } from '../../types/energy-raport';
import { solarPanelProperties } from '../../types/solar-panel-properties';
import { windTurbineProperties } from '../../types/wind-turbine-properties';
import generateSolarEnergyRaport from '../../utils/solar-energy-raport/generateSolarEnergyRaport';
import generateWindEnergyRaport from '../../utils/wind-energy-raport/generateWindEnergyRaport';
import { defaultSolarPanelProperties } from '../../types/default-solar-panel-properties';
import { defaultWindTurbineProperties } from '../../types/default-wind-turbine-properties';
import { weatherDataProps } from '../../types/weather-data-props';
import RaportHeader from '../../features/raport/raport-header/raport-header';
import { Grid2} from '@mui/material';
import { raportProperties } from '../../types/raport-properties-props';
import RaportProperties from '../../features/raport/raport-properties/raport-properties';
import RaportCharts from '../../features/raport/raport-charts/raport-charts';
import { raportHeader } from '../../types/raport-header-props';
import { weatherData } from '../../types/weather-data';

const Raport: React.FC<weatherDataProps> = ({data}) => {
    const [raportHeader, setRaportHeader] = useState<raportHeader>({
        longitude: data.longitude,
        latitude: data.latitude,
        code: data.code
    });
    const [solarPanelProperties, setSolarPanelProperties] = useState<solarPanelProperties>(defaultSolarPanelProperties);
    const [windTurbineProperties, setWindTurbineProperties] = useState<windTurbineProperties>(defaultWindTurbineProperties);
    const [solarEnergyRaport, setSolarEnergyRaport] = useState<energyRaport[]>(generateSolarEnergyRaport(data.weatherConditions, solarPanelProperties as solarPanelProperties, data.latitude));
    const [windEnergyRaport, setWindEnergyRaport] = useState<energyRaport[]>(generateWindEnergyRaport(data.weatherConditions, windTurbineProperties as windTurbineProperties));

    const handlePropertiesCallback = (properties: raportProperties): void => {
        setSolarPanelProperties(properties.solarPanel);
        setWindTurbineProperties(properties.windTurbine);
        setSolarEnergyRaport(generateSolarEnergyRaport(data.weatherConditions, properties.solarPanel, data.latitude));
        setWindEnergyRaport(generateWindEnergyRaport(data.weatherConditions, properties.windTurbine));
    };

    const sendData = async (weatherData: weatherData) => {
        try {
            const response = await fetch(`/raport/${weatherData.code}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': import.meta.env.VITE_API_KEY
                  },
                  body: JSON.stringify(weatherData)
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch data`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleHeaderCallback = async (header: raportHeader): Promise<void> => {
        setRaportHeader({
            latitude: header.latitude,
            longitude: header.longitude,
            code: header.code
        });
        await sendData({
            latitude: header.latitude,
            longitude: header.longitude,
            weatherConditions: data.weatherConditions,
            code: header.code
        });
    }

    return (
        <div className='raport-container'>
            <Grid2 container rowSpacing={2} columnSpacing={8} overflow={'hidden'}>

                <RaportHeader data={raportHeader}
                callback={handleHeaderCallback}
                />

                <RaportProperties data={{
                    windTurbine: windTurbineProperties,
                    solarPanel: solarPanelProperties
                }} 
                callback={handlePropertiesCallback}
                />

                <RaportCharts data={{
                    solarEnergyRaport: solarEnergyRaport as energyRaport[],
                    windEnergyRaport: windEnergyRaport as energyRaport[]
                }} />

            </Grid2>
        </div>
    );
}

export default Raport;