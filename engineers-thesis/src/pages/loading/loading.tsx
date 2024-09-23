import './loading.css'

function Loading() {
    return (
        <div className='loading-container'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Loading;