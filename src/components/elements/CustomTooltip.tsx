import React from 'react';

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    className?: string; // Optional className prop
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, className }) => {
    if (!active || !payload || payload.length === 0) {
        return null; // Return null if not active or payload is empty
    }

    return (
        <div className={`custom-tooltip ${className}`}>
            <p className="label">{`${label} : ${payload[0].value}`}</p>
            {/* <p className="desc">Additional information can go here.</p> */}
        </div>
    );
};

export default CustomTooltip;