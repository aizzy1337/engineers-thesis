import './error.css'
import { Link } from "react-router-dom";

function Error() {
    return(
        <>
            <h1 className='text-error'>Error</h1>
            <h3 className="text-error-2">Something went wrong</h3>
            <h3 className="return-button">
                <Link to={`/`}>Return</Link>
            </h3>
        </>
    );
}

export default Error;