import React from 'react';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
   
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: { title: "" }
        };
        this.loadAddCoursePage = this.loadAddCoursePage.bind(this);
    }

    loadAddCoursePage() { 
        browserHistory.push('/course'); 
    }

    render() {
        const {courses} = this.props;
        return (
            <div>
                <h1>Courses</h1>
                <input  type="submit"
                        value="Add Course"
                        className="btn btn-primary"
                        onClick={this.loadAddCoursePage} />
                <CourseList courses={courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    actions: React.PropTypes.object.isRequired,
    courses: React.PropTypes.array.isRequired    
};

function mapStateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);