import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad, all, score }) => {
    if ({ good } === 0 && { neutral } === 0 && { bad } === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )

    }

    return (
        <div>
            <p>good {good} </p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {all}</p>
            <p>average {score / all}</p>
            <p>positive {100 * good / all} % </p>
        </div>
    )
}


const Button = ({ onClick, text }) => (
    <button onClick={onClick} >
        {text}
    </button>
)

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [score, setScore] = useState(0)

    const handleValue = (props) => {
        setAll(all + 1)

        if (props === 'good') {
            setGood(good + 1)
            setScore(score + 1)
            console.log(good)
        } else if (props === 'neutral') {
            setNeutral(neutral + 1)
        } else if (props === 'bad') {
            setBad(bad + 1)
            setScore(score - 1)
            console.log({bad})
        }
    }

    return (
        <div>
            <h2>Give feedback</h2>

            <Button onClick={() => handleValue('good')} text='good' />
            <Button onClick={() => handleValue('neutral')} text='neutral' />
            <Button onclick={() => handleValue('bad')} text='bad' />

            <h3>Statistics</h3>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

