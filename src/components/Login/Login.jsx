import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { Link, Redirect } from 'react-router-dom';
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
import { withCookies, Cookies } from 'react-cookie';

import styles from './styles.scss'

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        password: '',
        email: ''
      },

      message: 'Login',
      isLogin: false,
      logout: false,
    }

    this.redirected = false;
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    let user = cookies.get('login');
    console.log("user email: " + user);
    if (user) {
      this.setState({
        isLogin: true,
        message: unescape(user) + ' is Login'
      });
    }
  }

  onSubmit(e) {
    const { cookies } = this.props;
    e.preventDefault();

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request (This should probably done with Axios instead)
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/api/user/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.isLogin = true;
        this.setState({
          message: 'Login Successful! Page will be redirect'
        })
        console.log("login success");
        console.log('email: ' + email);
        cookies.set('login', email, { path: '/' });
        cookies.set('redirect', true, { path: '/' });
        setTimeout(function() {
          this.setState({isLogin: true});
        }.bind(this), 2000);
      } else {
        this.setState({
          message: 'Unable to log in'
        })
        console.log("login failed");
        console.log(xhr.response);
      }
    });
    xhr.send(formData);
  }

  onChangeEmail(e) {
    const user = this.state.user;
    user.email = e.target.value;
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

  handleLogout(event) {
    this.props.cookies.remove('login');
    this.setState({
      message: "Log Out in 2s..."
    });
    setTimeout(function() {
      this.setState({
        message: "Log Out in 1s..."
      });
    }.bind(this), 1000);
    setTimeout(function() {
      this.setState({
        logout: true
      });
    }.bind(this), 2000);
  }

  render() {
    const { cookies } = this.props;
    let redirected = cookies.get('redirect');
    if (this.state.isLogin && redirected) {
      this.props.cookies.remove('redirect');
      return <Redirect to='/status' />
    }

    let logout_btn = (
      <span></span>
    );
    if (this.state.isLogin) {
      logout_btn = (
        <Button
          raised
          color="accent"
          className="logoutBtn"
          onClick={this.handleLogout}
          >
          Log Out
        </Button>
      );
    }

    if (this.state.logout) {
      return <Redirect to='/' />
    }

    const { classes } = this.props;
    return(
      <div>
        <AppBar position="static">
          <Toolbar className= "titleBar">
            <Typography type="title" color="inherit" className= "titleBarTitle">
              {this.state.message}
            </Typography>
          </Toolbar>
        </AppBar>
        {logout_btn}
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
        <Button raised color="accent" onClick={this.onSubmit} className="navbutton">
          submit
        </Button>
        <br/><br/>
        <Button raised color="accent" href = "/register" className="navbutton">
          Register
        </Button>
      </div>
    )
  }
}


export default withCookies(Login);
