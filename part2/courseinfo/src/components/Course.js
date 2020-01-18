import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Part = ({ part, exercises }) => {

    return (
        <p>{part} {exercises} </p>
    )
}

const Content = ({ content }) => {
    // console.log(content)

    const rows = () => content.map(c => <Part key={c.name} part={c.name} exercises={c.exercises} />)

    return (
        <div>
            {rows()}
        </div>
    )
}

const Total = ({total}) => {
    return (
        <h4>
            total of {total} exercises
        </h4>
    )
}

const Course = ({ course }) => {

    const total = course.parts.reduce(((sum, part) => sum + part.exercises), 0)

    return (
        <div>
            <Header course={course} />
            <Content content={course.parts} />
            <Total total={total} />
        </div>
    )
}

export default Course