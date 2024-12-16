import { useParams } from 'react-router-dom';
import Loading from '../../pages/loading/loading';
import Raport from '../../pages/raport/raport';
import { useWeatherData } from './use-weather-data';
import ErrorComponent from '../../pages/error/error'

const RaportByLocation = () => {
  const { lat, lng } = useParams<{ lat: string; lng: string }>();
  const { weatherData, loading, error } = useWeatherData(lat, lng);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return weatherData ? <Raport data={weatherData} /> : <ErrorComponent />;
};

export default RaportByLocation;
