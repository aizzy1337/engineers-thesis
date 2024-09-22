import { weatherCondition } from "./weather-condition";

export interface weatherData {
    latitude: number,
    longitude: number,
    weatherConditions: weatherCondition[]
}