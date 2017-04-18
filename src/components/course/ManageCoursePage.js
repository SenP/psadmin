import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
    
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, props.course),
            errors: {},
            saving: false
        };
        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.course.id !== newProps.course.id) {
            this.setState({
                course: Object.assign({}, newProps.course)
            });
        }
    }

    updateCourseState(event) {        
        const course = this.state.course;
        course[event.target.name] = event.target.value;
        this.setState({ course });
    }

    saveCourse(event) {
        event.preventDefault();
        this.setState({saving: true});
        this.props.actions.saveCourse(this.state.course)
                          .then(this.redirect)
                          .catch(error => {
                            toastr.error(error);
                            this.setState({saving: false});                      
                          });
    }

    redirect() {
        this.setState({saving: false});
        toastr.success('Course Saved');
        this.context.router.push('/courses');
    }

    render() {
        return (
            <div>
                <h1>Manage Course</h1>
                <CourseForm 
                    allAuthors={this.props.authors}                    
                    course={this.state.course}
                    errors={this.state.errors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    saving={this.state.saving}
                />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    actions: React.PropTypes.object.isRequired,
    course: React.PropTypes.object.isRequired,
    authors: React.PropTypes.array.isRequired
};

ManageCoursePage.contextTypes = {
    router: React.PropTypes.object
};

function getCourseById(courses, id) {
    let [course] = courses.filter(course => course.id == id);
    return course;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;
    let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};
    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }    
    const formatAuthors = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });
    return {
        course,
        authors: formatAuthors
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);