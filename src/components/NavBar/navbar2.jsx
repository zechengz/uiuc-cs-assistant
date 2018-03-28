import React, { Component } from 'react';
import './Nav.css';
//import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import Notifications from 'material-ui-icons/Notifications';
import ListIcon from 'material-ui-icons/List'
import SearchIcon from 'material-ui-icons/Search';
import Button from 'material-ui/Button';
import { Link, Redirect } from 'react-router-dom'

// import ActionList from 'material-ui/svg-icons/action/list';
// import ActionSearch from 'material-ui/svg-icons/action/search';

// hard coded values for prototype
// import logo from './assets/uucr.jpg';
// import sampleAvatar from './assets/sampleUser.jpg'

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      redirect: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(event) {
    console.log(event.target.value);
    if (event.target.value == 'cs498') {
      console.log('redirect');
      this.setState({
        value: event.target.value,
        redirect: true
      });
      return;
    }
    this.setState({
      value: event.target.value
    });
  }

  onSearch(event) {
    console.log(event.target.value);
    if (event.target.value == 'cs498') {
      console.log('redirect');
      this.setState({
        value: '',
        redirect: false
      });
    }
    this.setState({
      value: ''
    });
  }

  render() {
    let search = '/';
    if (this.state.redirect == true) {
      search = '/class_profile';
    }
    return (
      <div className="NavBar">
        <header className="NavBar.navHeader" id="navHeader">
          <img src='/assets/uucr.jpg' className="App-logo" alt="logo" />
          <form id= "navSearch" className={NavBar.container} noValidate autoComplete="off" onSubmit={this.onSearch}>
            <TextField
              id="search"
              label="Search field"
              type="search"
              value={this.state.value}
              onChange={this.onChange}
              className={NavBar.TextField}
              />
            <Link to={search}>
              <input type="submit" value="Submit" />
            </Link>
          </form>
          <IconButton tooltip="Notifications">
            <Notifications />
          </IconButton>
          <Link to='/user' className={NavBar.avatar} id= "navAvatar">
            <Button>
              <Avatar  alt="sampleAvatar" src='/assets/sampleUser.jpg'  />
            </Button>
          </Link>
          <Badge className="NF"
            badgeContent={10}
            color="accent"
            >
            <IconButton tooltip="Notifications">
              <Notifications />
            </IconButton>
          </Badge>
          <Button id="navCD" className={NavBar.button} raised color="default">
            Classes
            <ListIcon className={NavBar.rightIcon} />
          </Button>
        </header>
      </div>
    );
  }
}

export default NavBar;
