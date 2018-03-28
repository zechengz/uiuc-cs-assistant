import React, { Component } from 'react';

import NavBar from '../NavBar/navbar.jsx';
import CourseVisualize from '../UserStatus/MainSection/CourseVisualize/CourseVisualize.jsx';

import styles from './TrackField.scss';

class TrackField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: this.props.location.field
    };
  }

  render() {
    // let field = 'Machines';
    let field = this.state.field;
    return (
      <div className='TrackField'>
        <NavBar />
        <CourseVisualize trackField={field} />
      </div>
    );
  }
}

export default TrackField;
