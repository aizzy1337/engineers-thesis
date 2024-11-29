export function calculateShapeParameter(
    windSpeeds: number[]
): number {
    const n = windSpeeds.length;
    const mean = windSpeeds.reduce((acc, speed) => acc + speed, 0) / n;
    const variance = windSpeeds.reduce((acc, speed) => acc + Math.pow(speed - mean, 2), 0) / n;
    
    const shape = Math.pow(mean, 2) / variance;
    return shape;
}
