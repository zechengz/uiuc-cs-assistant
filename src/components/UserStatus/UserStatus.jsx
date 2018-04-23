import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import socketClient from 'socket.io-client';

// components
import SidePanel from './SidePanel/SidePanel.jsx';
import CourseVisualize from './MainSection/CourseVisualize/CourseVisualize.jsx';
import Plan from './MainSection/Plan/Plan.jsx';

import styles from './UserStatus.scss'

class UserStatus extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
    //  reload using socket.io, slower but work !
    this.socket = socketClient('http://localhost:55555');
    this.socket.on('refresh', (data) => {
      location.reload();
    });
  }

  render() {
    return (
      <Grid
        className="UserStatus"
        spacing={24}
        container>
        <Grid
          className='main-section'
          xs={12}
          sm={12}
          md={9}
          item>
          <CourseVisualize />
          <Plan />
        </Grid>
        <SidePanel />
      </Grid>
    )
  }
}

export default UserStatus;
