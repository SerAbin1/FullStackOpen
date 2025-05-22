const Course = ({ course }) => (
  <div>
    {course.map(value => (
      <div key={value.id}>
        <Header course={value.name} />
        <Content parts={value.parts} />
      </div>
    ))}
  </div>
)

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
    <Total exercises={props.parts} />
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({exercises}) => {
  const total = exercises.reduce((total, exercise) => (
        total + exercise.exercises), 0)

  return (
    <p>
      total of {total} exercises
    </p>
  ) 
}

export default Course
