import './raport.css'
import { jsonResponseConverter } from '../../utils/jsonResponseConverter';
import { useEffect } from 'react';

function Raport() {
    useEffect(() => {
        const getWeatherConditions = async () => {
          const response = await fetch("/weather/50/20/2024-09-16/2024-09-17");
          console.log(await jsonResponseConverter(response));
        }
    
        getWeatherConditions();
    }, []);

    return (
        <>
        </>
    );
}

export default Raport;