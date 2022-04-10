import React, { useState, useEffect } from 'react';
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

    const [bestTime, setBestTime] = useState(
        () => JSON.parse(localStorage.getItem('bestTimeArr')) || []
    );

    const [time, setTime] = useState(0);

    const [intervalID, setIntervalID] = useState(0);

    const [dice, setDice] = useState(allNewDice());

    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        setTenzies(
            dice.every((die) => die.isHeld && dice[0].value === die.value)
        );
    }, [dice]);

    useEffect(() => {
        if (tenzies) {
            clearInterval(intervalID);
            setIntervalID(0);
        }
    }, [tenzies, intervalID]);

    useEffect(() => {
        if (tenzies && time !== 0 && time < 20) {
            setBestTime((prevTime) => [...prevTime, time]);
        }
    }, [tenzies, time]); // (!==0 ) means when reset time state and rerender this useEffect and best time always get 0()

    useEffect(() => {
        localStorage.setItem('bestTimeArr', JSON.stringify(bestTime));
    }, [bestTime]);

    // start counting timer when call this function
    const timer = () => {
        const newIntervalID = setInterval(
            () => setTime((time) => time + 1),
            1000
        );
        setIntervalID(newIntervalID);
    };

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

        //counting timer
        if (intervalID) {
            return;
        } else {
            setTime(0);
            timer();
        }
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

        // counting timer
        if (intervalID) return;
        timer();
    };

    const formatTime = (t) => {
        return t < 10 ? '0' + t.toString() : t;
    };

    //calculate timer
    const showTimer = (time) => {
        let second = 0;
        let minute = 0;
        let hour = 0;

        if (time < 60) {
            second = formatTime(time);
            return second;
        } else if (time < 3600) {
            minute = formatTime(Math.floor(time / 60));
            second = formatTime(time % 60);
            return minute + ':' + second;
        } else {
            hour = formatTime(Math.floor(time / 3600));
            minute = formatTime(Math.floor((time - hour * 3600) / 60));
            second = formatTime(time - hour * 3600 - minute * 60);
            return hour + ':' + minute + ':' + second;
        }
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
                {tenzies ? (
                    <p>
                        New Game <span className='dice'>🎲</span>
                    </p>
                ) : (
                    <p>
                        Roll <span className='dice'>🎲</span>
                    </p>
                )}
            </button>
            <h4 className='timer'>{showTimer(time)}</h4>
            <div className='score'>
                {bestTime.length !== 0 ? (
                    // `highest score: ${Math.min(...bestTime)}s`
                    <p>
                        highest score:{' '}
                        <span className='best-time'>
                            {Math.min(...bestTime)}s
                        </span>
                    </p>
                ) : (
                    <p>
                        highest score start from{' '}
                        <span className='limit-time'>20s</span>
                    </p>
                )}
            </div>
        </main>
    );
};

export default App;
