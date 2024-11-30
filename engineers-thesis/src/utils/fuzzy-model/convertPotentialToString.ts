export function convertPotentialToString(
    potential: number
) : string {
    switch(potential) {
        case 33: {
            return "LOW POTENTIAL"
        }
        case 66: {
            return "MEDIUM POTENTIAL"
        }
        case 100: {
            return "HIGH POTENTIAL"
        }
        default: {
            return "NO POTENTIAL"
        }
    }
}