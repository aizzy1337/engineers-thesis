import { responseJson } from "../types/response-json";
import { weatherCondition } from "../types/weather-condition";

export async function jsonResponseConverter(response: Response): Promise<weatherCondition[]> {
    console.log(response);
    const responseJson = await response.json() as string;
    console.log(responseJson);
    const parsedObject: responseJson = JSON.parse(responseJson);
    console.log(parsedObject);

    return parsedObject.days;
}