import { useParams } from "react-router-dom";

function RaportByLocation() {
    const { lat, lng } = useParams();

    return (
        <>
            {lat}
            {lng}
        </>
    );
}

export default RaportByLocation;