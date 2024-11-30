export function convertPotentialToColor(
    potential: number
) : string {
    switch(potential) {
        case 33: {
            return "#FFB3B3"
        }
        case 66: {
            return "#FFD9B3"
        }
        case 100: {
            return "#FFFFB3"
        }
        default: {
            return "#B3FFB3"
        }
    }
}