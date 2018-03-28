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

class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <header className="NavBar.navHeader" id="navHeader">
            <img src='/assets/uucr.jpg' className="App-logo" alt="logo" />
            <IconButton className="NavSearchButton" >
            </IconButton>
            <Button id="navCD_1" className={NavBar.button} raised color="default">
              Login
            </Button>
        </header>
      </div>
    );
  }
}

export default NavBar;
