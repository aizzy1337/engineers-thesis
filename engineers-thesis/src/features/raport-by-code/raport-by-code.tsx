import { useParams } from "react-router-dom";
import Loading from "../../pages/loading/loading";
import ErrorComponent from "../../pages/error/error";
import Raport from "../../pages/raport/raport";
import { useWeatherDataByCode } from "./use-weather-data-by-code";

const RaportByCode = () => {
  const { code } = useParams<{ code: string }>();
  const { weatherData, loading, error } = useWeatherDataByCode(code);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  return weatherData ? <Raport data={weatherData} /> : <ErrorComponent />;
};

export default RaportByCode;