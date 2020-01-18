import React from 'react'

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}
const Part = (props) => {
    return (
        <p>
            {props.part} {props.exercises}
        </p>
    )
}
const Content = ({content}) => {
    // console.log(content)
    return (
        <div>
            <Part part={content[0].name} exercises={content[0].exercises} />
            <Part part={content[1].name} exercises={content[1].exercises} />
            <Part part={content[2].name} exercises={content[2].exercises} />
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