import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

const App = () => {
    // generate random number between 1-6
    const allNewDice = () => {
        const newDice = [];

        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            });
        }

        return newDice;
    };

    // dice state
    const [dice, setDice] = React.useState(allNewDice());

    // rollDice when click roll button
    const rollDice = () => {
        setDice((prevDice) => {
            return allNewDice().map((dice, index) => {
                return prevDice[index].isHeld ? prevDice[index] : dice;
            });
        });
    };

    const handleHeld = (currentHeldID) => {
        setDice((prevDice) => {
            return prevDice.map((dice) =>
                dice.id === currentHeldID
                    ? { ...dice, isHeld: !dice.isHeld }
                    : dice
            );
        });
    };

    // loop to display dice
    const diceElements = dice.map((dice) => (
        <Die
            key={dice.id}
            value={dice.value}
            handleHeld={() => handleHeld(dice.id)}
            isHeld={dice.isHeld}
        />
    ));

    return (
        <div>
            <main>
                <h1 className='title'>Tenzies</h1>
                <p className='instructions'>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <div className='container'>{diceElements}</div>
                <button className='roll' onClick={rollDice}>
                    Roll
                </button>
            </main>
        </div>
    );
};

export default App;
