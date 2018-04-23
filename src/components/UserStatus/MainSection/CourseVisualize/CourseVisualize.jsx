import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import 'babel-polyfill';

import styles from './CourseVisualize.scss'

const style = theme => ({
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const dict = {
  'Basics':['cs100','cs101','cs105','cs125','cs126','cs173','cs196','cs199','cs210','cs225','cs233','cs241','cs242',
  'cs296','cs357','cs361','cs374'],
  'Software Foundations':
  ['cs422','cs426','cs427','cs428','cs429','cs476','cs477','cs492','cs493','cs494','cs498 Software Testing','cs522','cs524','cs526','cs527','cs528','cs576'],
  'Algorithms and Models of Computation':
  ['cs413','cs473','cs475','cs476','cs477','cs481','cs482','cs571','cs572','cs573','cs574','cs575','cs576','cs579','cs583',
  'cs584'],
  'Intelligence and Big Data':
  ['cs410','cs411','cs412','cs414','cs440','cs443','cs445','cs446','cs447','cs466','cs467','cs510','cs511','cs512','cs543',
  'cs544','cs546','cs548','cs566','cs576','cs598 MLSP'],
  'Human and Social Impact':
  ['cs416','cs460','cs461','cs463','cs465','cs467','cs468','cs498','cs498rk','cs563','cs565'],
  'Media':
  ['cs414','cs418','cs419','cs445','cs465','cs467','cs498 VR','cs519','cs565','cs598 Mach Lrng for Signal Processng'],
  'Scientific, Parallel, and High Performance Computing':
  ['cs419','cs450','cs457','cs466','cs482','cs483','cs484','cs519','cs554','cs555','cs556','cs558'],
  'Distributed Systems, Networking, and Security':
  ['cs423','cs424','cs425','cs431','cs436','cs438','cs439','cs460','cs461','cs463','cs483','cs484','cs523','cs524','cs525',
  'cs538','cs563'],
  'Machines':
  ['cs423','cs424','cs426','cs431','cs433','cs484','cs523','cs526','cs533','cs536','cs541','cs584','cs598 PP'],
  'Group Project':
  ['cs427','cs428','cs429','cs445','cs465','cs467','cs493','cs494']
};

//const dist_system = [3,1,3,3,2,3,1,1];
//const machines = [3,2,1,1,1,1,1,1,1,1];
//const scientific = [1,2,1,3,1,3,1];
//const media = [1,2,1,2,1,1,1,1];
//const human = [1,3,3,1,1,2];
//const intelligence = [3,1,3,2,2,3,3,1,1,1,1];
//const algorithm = [1,1,3,2,1,3,2,1,2];
//const software = [1,2,2,2,3,1,1,1,2,1,1];

const checkdirection = {
  'Distributed Systems, Networking, and Security':[3,1,3,3,2,3,1,1],
  'Machines':[3,2,1,1,1,1,1,1,1,1],
  'Scientific, Parallel, and High Performance Computing':[1,2,1,3,1,3,1],
  'Media':[1,2,1,2,1,1,1,1],
  'Human and Social Impact':[1,3,3,1,1,2],
  'Intelligence and Big Data':[3,1,3,2,2,3,3,1,1,1,1],
  'Algorithms and Models of Computation':[1,1,3,2,1,3,2,1,2],
  'Software Foundations':[1,2,2,2,3,1,1,1,2,1,1]
};

const file_name = [
  '/assets/course-icon/course-cs125.png',
  '/assets/course-icon/course-cs173.png',
  '/assets/course-icon/course-cs242.png',
  '/assets/course-icon/course-cs446.png',
  '/assets/course-icon/course-cs493.png',
  '/assets/course-icon/course-cs498.png',
];

class CourseVisualize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      email: '',
      userInfo: {},
      track: this.props.trackField,
      trackName: '',
      open: false,
      // For Enter GPA
      userCourseGPA: [],
      openGPA: false,
      gpa: '',
      index: -1,
      cIndex: -1,
    };

    this.handleChangeCourse = this.handleChangeCourse.bind(this);

    // Enter Class GPA
    this.handleClassClickOpen = this.handleClassClickOpen.bind(this);
    this.handleClassRequestClose = this.handleClassRequestClose.bind(this);
    this.handleClassOnSubmit = this.handleClassOnSubmit.bind(this);
    this.handleClassOnChange = this.handleClassOnChange.bind(this);
  }

  async componentWillMount() {
    console.log("in CourseVisualize");
    const { cookies } = this.props;
    let email = cookies.get('login');
    email = unescape(email);
    console.log(email);
    //    email = 'dashen@gg.com';

    // begin read csv file
    function readTextFile(file) {
      var ret = {};
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            var a = allText.split('\n');
            for (var i=1; i < a.length; i++) {
              var temp = a[i].split(",");
              ret[temp[0]] = [parseFloat(temp[1]),parseFloat(temp[2])];
            }
          }
        }
      }
      rawFile.send(null);
      return ret;
    }
    var ret = readTextFile("assets/courses.csv");
    console.log(ret);
    var keys = Object.keys(ret);
    var number = [];
    for (var i=0; i < keys.length; i++) {
      number.push([ret[keys[i]][0],ret[keys[i]][1], keys[i]]);
    }
    number.sort(function(a,b) {
      return a[0] - b[0];
    });
    var index1 = parseInt(number.length / 3);
    var index2 = parseInt(number.length / 3 * 2);
    var one = [];
    var two = [];
    var three = [];
    for (var i=0; i < index1; i++){
      one.push(number[i]);
    }
    for (var i=index1; i < index2; i++){
      two.push(number[i]);
    }
    for (var i=index2; i < number.length; i++){
      three.push(number[i]);
    }
    // console.log(one); // lowest
    // console.log(two); //
    // console.log(three); // high

    let low = {};
    let mid = {};
    let high = {};

    for (let i = 0; i < one.length; i++) {
      let course = one[i][2];
      let name = course.split(' ')[0];
      low[name] = one[i];
    }
    for (let i = 0; i < two.length; i++) {
      let course = two[i][2];
      let name = course.split(' ')[0];
      mid[name] = two[i];
    }
    for (let i = 0; i < three.length; i++) {
      let course = three[i][2];
      let name = course.split(' ')[0];
      high[name] = three[i];
    }

    if (this.props.trackField) { // for display track field page
      let track = this.props.trackField;
      let courselist = [];
      let count = 0;
      for (let i = 0; i < checkdirection[track].length; i++) {
        let curr = [];
        for (let j = 0; j < checkdirection[track][i]; j++) {
          let s = {};
          s.name = dict[track][count];
          s.gpa = 'N/A';
          s.taken = true; // whether user taken this course
          if (s.name in low) { // low
            s.gpa = low[s.name][1];
            s.popular = 'low';
          } else if (s.name in mid) { // mid
            s.gpa = mid[s.name][1];
            s.popular = 'medium';
          } else if (s.name in high){ // high
            s.gpa = high[s.name][1];
            s.popular = 'high';
          }
          // s.name = s.name.toUpperCase();
          s.img = file_name[count % file_name.length];
          count++;
          curr.push(s);
        } // end inner for loop
        courselist.push(curr);
      } // end outer for loop
      this.setState({
        courseList : courselist,
      });
    } // end if (trackField)
    else if (email) { // for display user current status
      // get user taken course
      let takenCourse = [];
      await axios.get('/api/user/takenCourse', {
        params: {
          email: email
        }
      }).then((response) => {
        takenCourse = response.data.data.classes;
      }).catch((error) => {
        console.error(error);
      });

      // end read csv file
      axios.get('/api/user/info', {
        params: {
          email: email
        }
      }).then((response) => {
        // console.log('ok');
        console.log(response.data);
        let user = response.data.data[0];
        // If API is finish
        user.classTaken = takenCourse;
        console.log("class taken --------------------");
        console.log(user.classTaken);

        let courselist = [];
        let count = 0;
        for (let i = 0; i < checkdirection[user.direction].length; i++) {
          let curr = [];
          for (let j = 0; j < checkdirection[user.direction][i]; j++) {
            let s = {};
            s.name = dict[user.direction][count];
            s.gpa = 'N/A';
            // NOTE: fetch classTaken from sql table enroll
            s.taken = user.classTaken.indexOf(s.name) !== -1 ? true : false;
            if (s.name in low) { // low
              s.gpa = low[s.name][1];
              s.popular = 'low';
            } else if (s.name in mid) { // mid
              s.gpa = mid[s.name][1];
              s.popular = 'medium';
            } else if (s.name in high){ // high
              s.gpa = high[s.name][1];
              s.popular = 'high';
            }
            // s.name = s.name.toUpperCase();
            s.img = file_name[count % file_name.length];
            count++;
            curr.push(s);
          }
          courselist.push(curr);
          this.setState({
            courseList : courselist,
            email: email,
            userInfo: user,
            trackName: user.direction,
          });
        } // end 1st for loop
      }).catch((error) => {
        console.log('Retrieve user info on error');
        console.error(error);
      });
      // } else {
      let sample = [];
      let list_a = [
        {name: 'CS125', gpa: 3.90, img: '/assets/course-icon/course-cs125.png'},
        {name: 'CS173', gpa: 3.80, img: '/assets/course-icon/course-cs173.png'},
      ];

      let list_b = [
        {name: 'CS225', gpa: 2.60, img: '/assets/course-icon/calculator.png'},
        {name: 'CS233', gpa: 3.20, img: '/assets/course-icon/database.png'},
        {name: 'CS241', gpa: 3.00, img: '/assets/course-icon/database.png'},
      ];
      let list_c = [
        {name: 'CS242', gpa: 3.10, img: '/assets/course-icon/course-cs242.png'},
        {name: 'CS357', gpa: 3.80, img: '/assets/course-icon/course-cs493.png', popular: 'mid'},
        {name: 'CS411', gpa: 3.75, img: '/assets/course-icon/database.png'},
        {name: 'CS498RK', gpa: 3.75, img: '/assets/course-icon/course-cs498.png', popular: 'mid'},
      ];
      let list_d = [
        {name: 'CS446', gpa: 2.8, img: '/assets/course-icon/calculator.png', popular: 'mid'},
      ];
      sample.push(list_a);
      sample.push(list_b);
      sample.push(list_c);
      sample.push(list_d);
      console.log('no user login');
      // this.setState({
      //   courseList: sample
      // });
    } // end if (email)
  }

  // Begin - Hanlder For Enter GPA
  handleClassClickOpen(index, cIndex) {
    this.setState({
      openGPA: true,
      index: index,
      cIndex: cIndex
    });
  }

  handleClassRequestClose() {
    this.setState({
      openGPA: false,
      index: -1,
      cIndex: -1,
      gpa: ''
    });
  }

  handleClassOnSubmit() {
    let course_list = this.state.courseList;
    let user_info = this.state.userInfo;
    let index = this.state.index;
    let cIndex = this.state.cIndex;
    let course_name = course_list[index][cIndex].name;
    course_list[index][cIndex].taken = !course_list[index][cIndex].taken;
    if (course_list[index][cIndex].taken) {
      user_info.classTaken.push(course_list[index][cIndex].name);
    } else {
      // bug
      let index = user_info.classTaken.indexOf(course_list[index][cIndex].name)
      if (index != -1) {
        user_info.classTaken.splice(index, 1);
      } else {
        console.error('should not print, index error')
      }
    }

    // send data to database
    const { cookies } = this.props;
    let email = cookies.get('login');
    email = unescape(email);
    if (email) {
      // which course ?
      let course_gpa = this.state.value;
      axios.post('api/user/course', {
        class: course_name,
        gpa: this.state.gpa
      }, {
        params: {
          email: email
        }
      }).then((response) => {
        console.log("Insert User Enrollment Success");
        this.setState({
          courseList: course_list,
          userInfo: user_info,
          openGPA: false,
          index: -1,
          cIndex: -1,
          gpa: ''
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  handleClassOnChange(event) {
    console.log('cc');
    console.log(event.target.value);
    this.setState({ gpa : event.target.value });
  }
  // End - Hanlder For Enter GPA

  handleChangeCourse(index, cIndex) {
    let course_list = this.state.courseList;
    let user_info = this.state.userInfo;
    course_list[index][cIndex].taken = !course_list[index][cIndex].taken;
    if (course_list[index][cIndex].taken) {
      user_info.classTaken.push(course_list[index][cIndex].name);
    } else {
      // bug
      let index = user_info.classTaken.indexOf(course_list[index][cIndex].name)
      if (index != -1) {
        user_info.classTaken.splice(index, 1);
      } else {
        console.error('should not print, index error')
      }
    }
    this.setState({
      courseList: course_list,
      userInfo: user_info
    });
    // push update to database
    const { cookies } = this.props;
    let email = cookies.get('login');
    email = unescape(email);
    axios.post('/api/user/course', {
      params: {
        email: email,
        class: 'ABC',
        gpa: this.state.gpa
      },
    }).then((response) => {
      if (response.status == 200) {
        console.log('taken class sync success');
      } else {
        console.log('taken class sync failed');
      }
    }).catch((error) => {
      console.error(error);
      console.log("unable to sync user taken class");
    });
  }

  render() {
    let course_list = this.state.courseList;
    let empty_course = [{
      name: 'No Data',
      gpa: 'N/A',
      img: '/assets/not-login.svg',
    }];
    console.log('Email: ' + this.state.email);
    if (this.state.email === '') {
      course_list.push(empty_course);
    }
    console.log('Update: ' + this.state.track);
    let nname = this.state.trackName;
    if (nname == '') {
      nname = this.props.trackField;
    }
    // console.log(this.state.trackName);
    // console.log(this.props.trackField);
    return(
      <Paper className='CourseVisualize'>
        <Typography type="title" className='section-title'>
          {nname}
        </Typography>
        <Grid className='class-tree' container spacing={24}>
          {
            course_list.map((course_level, index) => {
              return (
                <Grid
                  key={index}
                  className='course-level'
                  item xs={12}
                  >
                  {
                    course_level.map((course, cIndex) => {
                      let pop_icon = (
                        <span></span>
                      );
                      if (course.popular === 'low') {
                        pop_icon = (
                          <div className='popular-icon'>
                            <img src='/assets/popular-icon/popular-low.png' />
                          </div>
                        );
                      } else if (course.popular === 'medium') {
                        pop_icon = (
                          <div className='popular-icon'>
                            <img src='/assets/popular-icon/popular-medium.png' />
                          </div>
                        );
                      } else if (course.popular === 'high') {
                        pop_icon = (
                          <div className='popular-icon'>
                            <img src='/assets/popular-icon/popular-high.png' />
                          </div>
                        );
                      }
                      let course_taken = (
                        <div className='course-taken'></div>
                      );
                      if (course.taken) {
                        course_taken = (
                          <span></span>
                        );
                      }
                      return (
                        <div
                          key={ course.name }
                          className='course-item'>
                          <div className='course'>
                            <div
                              className='course-icon-wrap'
                              onClick={course.taken === true ? null : () => this.handleClassClickOpen(index, cIndex)}
                              disabled={ course.taken }
                              >
                              {course_taken}
                              <img src={ course.img } />
                            </div>
                            <div className="flip-horizontal">
                              <div className="flipper flipper-flip-horizontal">
                                <div className="course-name front">
                                  {course.name}
                                </div>
                                <div className="gpa back">
                                  {'GPA: ' + course.gpa}
                                </div>
                              </div>
                              {pop_icon}
                            </div>
                          </div>
                          <div className='hr-line' />
                          <Dialog
                            className='dialog'
                            open={this.state.openGPA}
                            onRequestClose={this.handleClassRequestClose}
                            >
                            <DialogTitle>Course GPA</DialogTitle>
                            <DialogContent
                              className=''
                              >
                              <TextField
                                autoFocus
                                margin="dense"
                                label="Course GPA"
                                type="text"
                                onChange={this.handleClassOnChange}
                                fullWidth
                                />
                            </DialogContent>
                            <DialogActions
                              className='dialog-action'
                              >
                              <Button
                                color="primary"
                                className='dialog-btn-submit'
                                onClick={this.handleClassOnSubmit}
                                >
                                Submit
                              </Button>
                              <Button
                                color="accent"
                                className='dialog-btn-close'
                                onClick={this.handleClassRequestClose}
                                >
                                Close
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>
                      );
                    })
                  }
                </Grid>
              );
            })
          }
        </Grid>
      </Paper>
    );
  }
}

CourseVisualize.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withStyles(style)(withCookies(CourseVisualize));
