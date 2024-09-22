import { weatherCondition } from "./weather-condition"

export interface responseJson {
    queryCost: number,
    latitude: number,
    longitude: number,
    resolvedAddress: string,
    address: string
    tzoffset: number,
    days: weatherCondition[]
}