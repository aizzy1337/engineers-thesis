import { responseJson } from "../types/response-json";
import { weatherCondition } from "../types/weather-condition";

export async function jsonResponseConverter(response: Response): Promise<weatherCondition[]> {
    const responseJson = await response.json() as responseJson;
    return responseJson.days;
}