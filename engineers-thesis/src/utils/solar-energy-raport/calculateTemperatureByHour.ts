export function calculateTemperatureByHour(
    hour: number,
    sunriseHour: number,
    sunsetHour: number,
    tempMin: number,
    tempMax: number
): number {
    return (hour < sunriseHour || hour > sunsetHour) 
        ? tempMin 
        : tempMin + (tempMax - tempMin) * Math.sin(Math.PI * (hour - sunriseHour) / (sunsetHour - sunriseHour));
}
