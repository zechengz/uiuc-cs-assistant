import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Chip from 'material-ui/Chip';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

// these import and function Transition handles the dialog
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

import styles from './Plan.scss'


class Plan extends Component {
  constructor(props) {
    super(props);

    // temp usage
    let course_list = []
    course_list.push({
      semester: 'Spring 2018',
      courses: [
        'CS 374',
        'CS 440',
      ]
    });
    course_list.push({
      semester: 'Fall 2018',
      courses: [
        'CS 511',
        'CS 543',
        'CS 512',
        'CS 5499',
        'CS 513',
        'CS 545',
        'CS 514',
        'CS 544',
        'CS 5900'
      ]
    });
    course_list.push({
      semester: 'Fall 2014',
      courses: [
        'CS 125',
        'CS 173'
      ]
    });

    this.state = {
      planList: [],
      adv4: [],
      open: false,
      value: '',
      openList: [false, false, false, false],
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleFk = this.handleFk.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  async componentWillMount() {
    console.log('in Plan.jsx');
    const { cookies } = this.props;
    let email = cookies.get('login');
    email = unescape(email);
    let user;
    if (email) {
      this.setState({
        email: email
      });
      await axios.get('/api/user/info', {
        params: {
          email: email
        }
      }).then((response) => {
        // console.log('ok');
        // console.log(response.data);
        user = response.data.data[0];
      }).catch((error) => {
        console.log('Retrieve user info on error');
        console.error(error);
      });
      console.log('direction ---------');
      console.log(user);
      await axios.get('/api/user/getAdv3', {
        params: {
          direction: user.direction
        }
      }).then((response) => {
        let data = response.data.data;
        console.log('Adv3');
        console.log(data);
        // pre-process data
        let result = [];
        for (var i = 0; i < data.length; i++) {
          let item = data[i];
          if (item !== '') {
            item = item.split(';');
            result.push({
              semester: i,
              courses: item,
            });
          } else {
            break;
          }
        }
        this.setState({
          planList: result,
        });
      }).catch((error) => {
        console.error(error);
      });
      
      await axios.get('/api/user/getAdv4', {
        params: {
          direction: user.direction
        }
      }).then((response) => {
        let data = response.data.data;
        console.log('Adv4');
        console.log(data);
        // pre-process data
        let result = [];
        for (var i = 0; i < data.length; i++) {
          let item = data[i];
          if (item !== '') {
            item = item.split(';');
            result.push({
              semester: i,
              courses: item,
            });
          } else {
            break;
          }
        }
        this.setState({
          adv4: result,
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  handleClickOpen (index) {
    let list = this.state.openList;
    list[index] = true;
    this.setState({
      openList: list
    });
    console.log("open");
    console.log(index);
  }

  handleRequestClose (index) {
    // this.setState({ open: false });
    let list = this.state.openList;
    list[index] = false;
    this.setState({
      openList: list
    });
    console.log("close");
    console.log(index);
  }

  handleFk(index) {
    this.setState({
      open: false,
      value: index
    });
  }

  handleOnChange(event) {
    this.setState({ value : event.target.value });
  }

  handleOnSubmit() {
    const list = this.state.planList.concat([
      {
        semester: 'S2016',
        courses: [
          'CS 126',
        ]
      }
    ]);
    this.setState({
      planList: list,
      open: false,
      value: ''
    });
  }

  render() {
    let planList = this.state.planList;
    let adv4 = this.state.adv4;
    return (
      <Paper className='Plan'>
        <Typography type="title" className='section-title'>
          Frequent Pattern By # Students
        </Typography>
        <List className='plan-list'>
          {
            planList.map((semester, index) => {
              return (
                <ListItem
                  className='plan-item'
                  key={semester.semester}
                  button
                  onClick={() => this.handleClickOpen(index)}
                  >
                  <List className='plan-course-list'>
                    {
                      semester.courses.map((course) => {
                        return (
                          <ListItem
                            className='plan-course'
                            key={course}
                            >
                            <Chip
                              label={course}
                              className='plan-course-chip'
                              />
                          </ListItem>
                        );
                      })
                    }
                  </List>
                  <Chip
                    label={semester.semester}
                    className='plan-semester-chip'
                    />
                </ListItem>
              );
            })
          }
        </List>
        <Typography type="title" className='section-title'>
          Frequent Pattern By Average GPA
        </Typography>
        <List className='plan-list'>
          {
            adv4.map((semester, index) => {
              return (
                <ListItem
                  className='plan-item'
                  key={semester.semester}
                  button
                  onClick={() => this.handleClickOpen(index)}
                  >
                  <List className='plan-course-list'>
                    {
                      semester.courses.map((course) => {
                        return (
                          <ListItem
                            className='plan-course'
                            key={course}
                            >
                            <Chip
                              label={course}
                              className='plan-course-chip'
                              />
                          </ListItem>
                        );
                      })
                    }
                  </List>
                  <Chip
                    label={semester.semester}
                    className='plan-semester-chip'
                    />
                </ListItem>
              );
            })
          }
        </List>
      </Paper>
    );
  }
}

Plan.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(Plan);
