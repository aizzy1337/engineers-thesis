import { weatherCondition } from "../types/weather-condition";

export async function jsonResponseConverter(response: Response): Promise<weatherCondition[]> {
    const responseJson = await response.json() as string;
    const parsedObject = JSON.parse(responseJson);

    return parsedObject.days as weatherCondition[];
}