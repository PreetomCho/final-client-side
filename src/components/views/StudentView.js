import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student, deleteStudent } = props;
  let dispatch = useDispatch();
  let history = useHistory();

  const HandleDelete = (id) => {
    dispatch(deleteStudent(id));
    history.push('/students');
  }


  // Render a single Student view 
  return (
    <div>
      <h1 onClick={() => history.push(`/student/${student.id}`)}>{student.firstname + " " + student.lastname}</h1>
      <h3>{student?.email}</h3>
      <h3>{student?.gpa}</h3>
      <h3>{student.campus.name}</h3>
      <p>Attends: </p>
      <Link to={`/campus/${student.campus.id}`} style={{color: '#5972FF' }}>
        <h2>{student.campus.name}</h2>
      </Link>   
      <Link to={`/editstudent/${student.id}`}>
          <button>Edit Student Information</button>
      </Link>
      <br></br>
      <br></br>
      <button onClick={() => HandleDelete(student.id)}>Delete</button>
    </div>
  );

};

export default StudentView;