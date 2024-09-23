import { useParams } from "react-router-dom";

function RaportByCode() {
    const { code } = useParams();

    return (
        <>
            {code}
        </>
    );
}

export default RaportByCode;