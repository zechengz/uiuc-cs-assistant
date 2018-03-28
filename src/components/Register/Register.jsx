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
import Avatar from 'material-ui/Avatar';

import axios from 'axios'

import styles from './styles.scss'


class Register extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        username: '',
        password: '',
        email: '',
        showPassword: false,
        trackValue: 0,
        yearValue: 0
      },

      message: 'Register User'
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleTrackSelectChange = this.handleTrackSelectChange.bind (this);
    this.handleYearSelectChange = this.handleYearSelectChange.bind (this);

    // global data arrays and mapping
    this.tracks = [
      'Basics',
      'Software Foundations',
      'Intelligence and Big Data',
      'Human and Social Impact',
      'Media',
      'Machines',
      'Distributed Systems, Networking, and Security',
      'Scientific, Parallel, and High Performance Computing'
    ];

    this.years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
    this.avatars = ['assets/avatar-1.svg', 'assets/avatar-2.svg', 'assets/avatar-3.svg'];
    this.avatarIndex = Math.floor (Math.random() * this.avatars.length);
    console.log ("Assigned avatar index: " + this.avatarIndex);
  }

  onSubmit(e) {
    e.preventDefault();

    // create a string for an HTTP body message
    const name = encodeURIComponent(this.state.user.username);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const year = encodeURIComponent(this.years[this.state.user.yearValue]);
    const track = encodeURIComponent(this.tracks[this.state.user.trackValue]);
    const avatar = encodeURIComponent(this.avatars[this.avatarIndex]);
    const formData = `name=${name}&email=${email}&password=${password}&year=${year}&direction=${track}&avatar=${avatar}`;

    // create an AJAX POST request (This should probably done with Axios instead)
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/user');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      if (xhr.status === 201) {
        console.log('The form is valid');
        this.setState({
          message: 'User Registered!'
        })
      } else {
        this.setState({
          message: 'Unable To Register'
        })
      }
    });
    xhr.send(formData);
  }


  onChangeUserName(e) {
    const user = this.state.user;
    user.username = e.target.value;
    this.setState({
      user
    })
  }

  onChangeEmail(e) {
    const user = this.state.user;
    user.email = e.target.value;
    this.setState({
      user
    })
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
    
    return(
      <div>
        <div >
          <AppBar position="static">
            <Toolbar className= "titleBar">
              <Typography type="title" color="inherit" className= "titleBarTitle">
                {this.state.message}
              </Typography>
            </Toolbar>
          </AppBar>
          <br/><br/>
          <TextField
            label="Username"
            placeholder="Enter your username"
            className="input"
            margin="normal"
            onChange={this.onChangeUserName}
            />
          <br/><br/>
          <TextField
            label="Email"
            placeholder="Enter your email"
            className="input"
            margin="normal"
            onChange={this.onChangeEmail}
            />
          <br/><br/>
          <Input
            label="Password"
            className="input"
            margin="dense"
            placeholder="Password"
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

          <br/><br/><br/>
          <div className="avatarDisplayDiv">
          <InputLabel>You are assigned with this avatar:</InputLabel>
            <Avatar src={this.avatars[this.avatarIndex]} className="userAvatar"/>
          </div>



          <br/><br/><br/><br/><br/><br/>
          <Button raised color="accent" onClick={this.onSubmit} className="navbutton">
            submit
          </Button>
          <br/><br/>
          <Button raised color="accent" href = "/login" className="navbutton">
            Login
          </Button>
          <br/><br/>
        </div>
      </div>
    );
  }
}

export default Register
