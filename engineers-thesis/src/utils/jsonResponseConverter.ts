import { weatherCondition } from "../types/weather-condition";

export async function jsonResponseConverter(response: Response): Promise<weatherCondition[]> {
    console.log(response);
    const responseJson = await response.json() as string;
    console.log(responseJson);
    const parsedObject = JSON.parse(responseJson);
    console.log(parsedObject);
    console.log(parsedObject.days);

    return parsedObject.days as weatherCondition[];
}