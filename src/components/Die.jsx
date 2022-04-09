import React from 'react';

const showDice = [
    ['center-dot'],
    ['topLeft-dot', 'bottomRight-dot'],
    ['topRight-dot', 'center-dot', 'bottomLeft-dot'],
    ['topRight-dot', 'topLeft-dot', 'bottomRight-dot', 'bottomLeft-dot'],
    [
        'topRight-dot',
        'topLeft-dot',
        'center-dot',
        'bottomRight-dot',
        'bottomLeft-dot',
    ],
    [
        'topRight-dot',
        'topLeft-dot',
        'centerLeft-dot',
        'centerRight-dot',
        'bottomRight-dot',
        'bottomLeft-dot',
    ],
];

const Die = (props) => {
    const generateDot = (value) => {
        const getDotNameArr = showDice[value - 1]; // index start from zero
        return getDotNameArr.map((dotName, idx) => (
            <div className={`dot ${dotName}`} key={idx + 1}></div>
        ));
    };

    return (
        <div
            value={props.value}
            className={`die ${props.isHeld ? 'held' : ''}`}
            onClick={props.handleHeld}
        >
            <div className='num'>{generateDot(props.value)}</div>
        </div>
    );
};

export default Die;
