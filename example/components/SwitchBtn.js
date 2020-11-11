import React from "react";

import './switchBtn.css';

const SwitchBtn = ({ onChange, active }) => {

    return (
        <label className="switchBtn">
            <input type="checkbox" checked={active} onChange={(e) => onChange(e.target.value)} />
            <span className="switchBtn__slider"></span>
        </label>
    )
}

export default SwitchBtn;


export const ToggleBtn = ({ onChange, active }) => {

    return (
        <label className="toggleBtn">
            <input type="checkbox" checked={active} onChange={() => onChange()} />
            <span className="toggleBtn__slider"></span>
        </label>
    )
}