import React from 'react';

const Die = (props) => {
    return (
        <div
            value={props.value}
            className={`die ${props.isHeld ? 'held' : ''}`}
            onClick={props.handleHeld}
        >
            <h2 className='num'>{props.value}</h2>
        </div>
    );
};

export default Die;
