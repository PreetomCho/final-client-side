/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link, useHistory } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const history = useHistory();
  const {campus, fetchCampus, deleteCampus, deleteStudent} = props;
  
  if (!campus) {
    return null;
  }

  const HandleRemoveCampus = (id) => {
    deleteCampus(id);
    history.push('/campuses');
  }

  const HandleRemoveStudent = (student) => {
    deleteStudent(student.id);
    fetchCampus(campus.id);
  }


  // Render a single Campus view with list of its students
  console.log(campus.students);
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/editcampus/${campus.id}`}>
          <button>Edit Campus Information</button>
        </Link>
        <button onClick={() => HandleRemoveCampus(campus.id)}>Remove Campus</button>
      {campus.students.length === 0 ? <p>No students enrolled</p> :
      campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>         
            <button onClick={() => HandleRemoveStudent(student)}> Remove Student </button>
            <br></br>
          </div>
        );
      })}
      <div>
        <br></br>
        <br></br>
        <Link to={`/students`}>
        <button>Add Student</button>
        </Link>
      </div>
    </div>
  );
};

export default CampusView;