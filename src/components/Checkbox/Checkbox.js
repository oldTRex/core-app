import React from "react";
import "./style.css";

export default function Checkbox({label, ...otherProps}) {
    return (
        <label className="checkbox-container">
            {label}
        <input type="checkbox" {...otherProps}/>
            <span className="checkbox"></span>
        </label>
    )
}