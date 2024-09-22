import { responseJson } from "../types/response-json";
import { weatherCondition } from "../types/weather-condition";

export async function jsonResponseConverter(response: Response): Promise<weatherCondition[]> {
    console.log(response);
    const responseJson = await response.json() as responseJson;
    console.log(responseJson);

    return responseJson.days;
}