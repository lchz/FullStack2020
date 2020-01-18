import React from 'react'

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}
const Part = ({part, exercises}) => {
    return (
        <p>{part} {exercises} </p>
    )
}
const Content = ({content}) => {
    // console.log(content)

    const rows = () => content.map(c => <Part key={c.name} part={c.name} exercises={c.exercises} />)

    return (
        <div>
            {rows()}
        </div>
    )
}

const Course = ({course}) => {

    return (
        <div>
            <Header course={course} />
            <Content content={course.parts} />
        </div>
    )
}

export default Course