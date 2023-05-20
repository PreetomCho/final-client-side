import Header from './Header';
import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
    // Initialize state
    constructor(props){
        super(props);
        this.state = {
            name: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            imageURL: this.props.campus.imageUrl,
            id: this.props.campus.id,
            redirect: false,
            redirectId: null,
        };
      }
    
      // Capture input data when it is entered
      handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      // Take action after user click the submit button
      handleSubmit = async event => {
        event.preventDefault();  // Prevent browser reload/refresh after submit.

        let campus = {
            name: this.state.name,
            address: this.state.address,
            description: this.state.description,
            id: this.state.id,
            imageUrl: this.state.imageUrl,
        };

        await this.props.editCampus(campus);
        
        // Update state, and trigger redirect to show the new student
        this.setState({
          name: "", 
          address: "", 
          description: "",
          id: "",
          redirect: true,
          imageUrl: "", 
          redirectId: this.props.campus.id
        });
      }

      componentDidMount() {
        this.props.fetchCampus(this.props.match.params.id);
      }
      // Unmount when the component is being removed from the DOM:
      // componentWillUnmount() {
      //     this.setState({redirect: false, redirectId: null});
      // }
    
      // Render new student input form
      render() {
        // Redirect to new student's page after submit
        if(this.state.redirect) {
          return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
    
        // Display the input form via the corresponding View component
        return (
          <div>
            <Header />
            <EditCampusView 
              handleChange = {this.handleChange} 
              handleSubmit={this.handleSubmit}    
              campus={this.props.campus}  
            />
          </div>          
        );
      }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapState = (state) => {
    return {
        campus: state.campus,
    }
}

const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (campus) => dispatch(fetchCampusThunk(campus)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);