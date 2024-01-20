const Course = ({course}) => {
    return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    )

}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => 
  <>
    {parts.map(part =>
    <Part key={part.id} part={part} />)}      
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({parts}) => 

<h3>total of {parts.reduce((s,p) => s + p.exercises, 0)} exercises</h3>

export default Course