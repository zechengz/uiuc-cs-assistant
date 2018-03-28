import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { withCookies, Cookies } from 'react-cookie';

import axios from 'axios'

import styles from './settings.scss'


class Settings extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        password: '',
        email: '',
        showPassword: false,
        trackValue: 0,
        yearValue: 0,
      },

      isLogin: false,
      message: 'Change User Settings'
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleTrackSelectChange = this.handleTrackSelectChange.bind (this);
    this.handleYearSelectChange = this.handleYearSelectChange.bind (this);

    // global data arrays and mapping
    this.tracks = [
      'Algorithms and Models of Computation',
      'Software Foundations',
      'Intelligence and Big Data',
      'Human and Social Impact',
      'Media',
      'Machines',
      'Distributed Systems, Networking, and Security',
      'Scientific, Parallel, and High Performance Computing'
    ];

    this.years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
  }

  componentWillMount() {
    const { cookies } = this.props;
    let email = cookies.get('login');
    email = unescape(email);
    console.log("user email: " + email);

    if (email) {
      axios.get('/api/user/info', {
        params: {
          email: email
        }
      }).then((response) => {
        let user = response.data.data[0];

        let nUser = Object.assign ({}, this.state.user);
        nUser.trackValue = this.tracks.indexOf(user.direction);
        nUser.yearValue = this.years.indexOf(user.year);
        nUser['email'] = email;
        this.setState({
          isLogin: true,
          message: 'Change Setting For User: ' + email,
          user: nUser
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if(this.state.isLogin === true){
      console.log("in");

      // create a string for an HTTP body message
      //        const name = encodeURIComponent(this.state.user.username);
      //        const email = encodeURIComponent(this.state.user.email);
      //        const password = encodeURIComponent(this.state.user.password);
      //        const year = encodeURIComponent(this.years[this.state.user.yearValue]);
      //        const track = encodeURIComponent(this.tracks[this.state.user.trackValue]);
      //const formData = `name=${name}&email=${email}&password=${password}&year=${year}&direction=${track}`;

      const formData = {
        name: this.state.user.username,
        email: this.state.user.email,
        password: this.state.user.password,
        year: this.years[this.state.user.yearValue],
        direction: this.tracks[this.state.user.trackValue]
      };
      console.log(formData);
      // create an AJAX POST request (This should probably done with Axios instead)
      console.log ('email:'  + this.state.user.email);
      const update = {
        year: this.years[this.state.user.yearValue],
        direction: this.tracks[this.state.user.trackValue]
      };

      const { cookies } = this.props;
      let email = cookies.get('login');
      email = unescape(email);
      axios.put('/api/user', update, {
        params: {
          email: email
        }
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            message: 'Updated User Settings !'
          });
        } else {
          this.setState({
            message: 'Unable Change User Settings'
          });
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    else {
      this.setState({
        message: 'Unable Change User Settings'
      })
    }
  }

  onChangeUserName(e) {
    const user = this.state.user;
    user.username = e.target.value;
    this.setState({
      user
    });
  }

  onChangePassword(e) {
    const user = this.state.user;
    user.password = e.target.value;
    this.setState({
      user
    })
  }

  handleClickShowPasssword(e) {
    const user = this.state.user;
    user.showPassword = !user.showPassword;
    this.setState({
      user
    })
    console.log(this.state.user.showPassword)
  }

  handleMouseDownPassword(e){
    e.preventDefault();
  };

  handleTrackSelectChange (event) {
    let nState = Object.assign ({}, this.state);
    nState.user = Object.assign ({}, this.state.user);
    nState.user.trackValue = event.target.value;
    this.setState (nState);
  }

  handleYearSelectChange (event) {
    let nState = Object.assign ({}, this.state);
    nState.user = Object.assign ({}, this.state.user);
    nState.user.yearValue = event.target.value;
    this.setState (nState);
  }

  render() {
    const { cookies } = this.props;

    return(
      <div>
        <div >
          <AppBar position="static">
            <Toolbar className= "titleBar">
              <Button href='/status' id="backbutton" raised color="accent">BACK</Button>
              <Typography type="title" color="inherit" className= "titleBarTitle">
                {this.state.message}
              </Typography>
            </Toolbar>
          </AppBar>
          <br/><br/>
          <TextField
            label="New Username"
            placeholder="Enter your username"
            className="input"
            margin="normal"
            onChange={this.onChangeUserName}
            />
          <br/><br/>
          <Input
            className="input"
            margin="dense"
            placeholder="New Password"
            type={this.state.user.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.onChangePassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleClickShowPasssword.bind(this)}
                  onMouseDown={this.handleMouseDownPassword.bind(this)}
                  >
                  {this.state.user.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            />
          <br/><br/>
          <div className="yearSelectFieldDiv">
            <InputLabel>Choose your current year</InputLabel>
            <br></br>
            <Select
              value={this.state.user.yearValue}
              onChange={this.handleYearSelectChange}
              input={<Input name="year" />}
              className="yearSelectField">
              {this.years.map (function (year, index) {
                return <MenuItem value={index} key={index}>{year}</MenuItem>
              })}
            </Select>
          </div>
          <br/><br/><br/>
          <div className="trackSelectFieldDiv">
            <InputLabel>Choose your track</InputLabel>
            <br></br>
            <Select
              value={this.state.user.trackValue}
              onChange={this.handleTrackSelectChange}
              input={<Input name="track" />}
              className="trackSelectField">
              {this.tracks.map (function (track, index) {
                return <MenuItem value={index} key={index}>{track}</MenuItem>
              })}
            </Select>
          </div>
          <br/><br/><br/><br/><br/><br/>
          <Button raised color="accent" onClick={this.onSubmit} className="navbutton">
            submit
          </Button>
          <br/><br/>
        </div>
      </div>
    );
  }
}

export default withCookies(Settings)
