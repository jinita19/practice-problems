import React, { useState } from "react";
import './ProgressBar.scss';

const MIN = 0;
const MAX = 100;

function ProgressBar() {
    const [percentValue, setPercentValue] = useState(0);
    const clampedValue = Math.min(Math.max(percentValue, MIN), MAX);

    return (
        <div>
            <label htmlFor="percent-input"> Enter progress percentage </label>
            <input
                id="percent-input"
                value = {percentValue}
                type="number"
                onChange={(e) => setPercentValue(e.target.value)}
            />
            <br/> 
            <br/>   
            <div className="progress">
            <div
                className="progress-bar"
                style={{width: `${clampedValue}%`}}
                role="progressbar"
                aria-valuemax={MAX}
                aria-valuemin={MIN}
                aria-valuenow={clampedValue}
            >
                {clampedValue}%
            </div>
        </div>
        </div>
        
    );
}

export default ProgressBar;