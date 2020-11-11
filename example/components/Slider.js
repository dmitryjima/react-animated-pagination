import React from "react";

import './slider.css';

const Slider = ({ onChange, value }) => {

    return (
        <div className="slidercontainer">
            <input 
                type="range" 
                min="1" 
                max="100" 
                value={value} 
                onChange={e => onChange(e.target.value)}
                className="slider"
            />
            <div className="slideroutput">{value}</div>
        </div>
    )
}

export default Slider;