import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

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

    //tenzies state
    const [tenzies, setTenzies] = React.useState(false);

    //update tenzies
    React.useEffect(() => {
        setTenzies(
            dice.every((die) => die.isHeld && dice[0].value === die.value)
        );
    }, [dice]);

    // rollDice when click roll button
    const rollDice = () => {
        setDice((prevDice) => {
            return allNewDice().map((die, index) => {
                return tenzies
                    ? die
                    : prevDice[index].isHeld
                    ? prevDice[index]
                    : die;
            });
        });
    };

    // handleHeld to each dice when click
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
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>
                {tenzies
                    ? 'You Win 🎉'
                    : `Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.`}
            </p>
            <div className='container'>{diceElements}</div>
            <button className='roll' onClick={rollDice}>
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    );
};

export default App;
