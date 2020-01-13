import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}
const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}
const Content = (props) => {
    // console.log(props.content.parts[0].name)
    return (
        <div>
            <Part part={props.content.parts[0].name} exercises={props.content.parts[0].exercises} />
            <Part part={props.content.parts[1].name} exercises={props.content.parts[1].exercises} />
            <Part part={props.content.parts[2].name} exercises={props.content.parts[2].exercises} />
        </div>
    )
}
const Total = (props) => {
    return (
        <p>
            Number of exercises {props.content.parts[0].exercises + props.content.parts[1].exercises + props.content.parts[2].exercises}
        </p>
    )
}

const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content content={course} />
            <Total content={course} />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));
