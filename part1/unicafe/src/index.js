
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad, all, score }) => {
    // console.log({bad})
    if (good  === 0 && neutral === 0 && bad === 0) {
        return (<p>No feedback given</p>)

    }

    return (
        <div>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={all} />
            <Statistic text='average' value={score/all} />
            <Statistic text='positive' value={good/all*100} string='%' />
        </div>
    )
}

const Statistic = ({text, value, string}) => {
    return (<p>{text} {value} {string}</p>)
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
        } else if (props === 'neutral') {
            setNeutral(neutral + 1)
        } 
        // else if(props === 'bad') {
        //     setBad(bad + 1)
        //     setScore(score - 1)
        // }
    }

    const handleBad = () => {
        setBad(bad + 1)
        setScore(score - 1)
        setAll(all + 1)
    }

    return (
        <div>
            <h2>Give feedback</h2>
            
            <Button onClick={() => handleValue('good')} text='good' />
            <Button onClick={() => handleValue('neutral')} text='neutral' />
            {/* <Button onclick={() => handleValue('bad')} text='bad' /> */}
            <Button onClick={handleBad} text='bad' />

            <h3>Statistics</h3>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score} />

        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

