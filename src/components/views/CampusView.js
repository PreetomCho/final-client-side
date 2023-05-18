/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteStudent} = props;
  
  if (!campus) {
    return null;
  }


  // Render a single Campus view with list of its students
  console.log(campus.students);
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.length === 0 ? <p>No students enrolled</p> :
      campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>         
            <button onClick={() => deleteStudent(student.id)}> Remove Student </button>
            <br></br>
          </div>
        );
      })}
      <div>
        <br></br>
        <Link to={'students'}>
        <button>Add Student</button>
        </Link>
      </div>
    </div>
  );
};

export default CampusView;