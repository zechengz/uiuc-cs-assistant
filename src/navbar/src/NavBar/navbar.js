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

// import ActionList from 'material-ui/svg-icons/action/list';
// import ActionSearch from 'material-ui/svg-icons/action/search';


// hard coded values for prototype
import logo from './assets/uucr.jpg';
import sampleAvatar from './assets/sampleUser.jpg'

class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <header className="NavBar.navHeader" id="navHeader">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="NavTitle">Fake Engineers</h1>
            <form id= "navSearch" className={NavBar.container} noValidate autoComplete="off">
              <TextField 
                id="search"
                label="Search field"
                type="search"
                className={NavBar.TextField}
              />
            </form>
            <IconButton className="NavSearchButton" >
              <SearchIcon />
            </IconButton>
            <Avatar id= "navAvatar" alt="sampleAvatar" src={sampleAvatar} className={NavBar.avatar} />
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

