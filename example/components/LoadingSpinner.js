import React from 'react';

import './loadingSpinner.css';

const LoadingSpinner = ({style}) => {

    return (
        <div style={{...style, position: 'relative'}}>
<div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoadingSpinner;