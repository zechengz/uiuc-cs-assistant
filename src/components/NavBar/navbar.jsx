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
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import { Link, Redirect } from 'react-router-dom'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import Autosuggest from 'react-autosuggest';
import IntegrationAutosuggest from '../SearchBar/searchbar.jsx'
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios'


// import ActionList from 'material-ui/svg-icons/action/list';
// import ActionSearch from 'material-ui/svg-icons/action/search';

// hard coded values for prototype
// import logo from './assets/uucr.jpg';
// import sampleAvatar from './assets/sampleUser.jpg'

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      redirect: false,
      anchorEl: null,
      open: false,
      openMenu: false,
      openUserMenu: false,
      openUserNF: false,
      value: '',
      suggestions: [],
      userNF: [],
      userInfo: {},

      //loginedIn: this.props.loginedIn
    };

    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleClickUserNF = this.handleClickUserNF.bind(this)
    this.handleNFRemoval = this.handleNFRemoval.bind(this)
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const { cookies } = this.props;
    let user = unescape (cookies.get('login'));
    if (user) {
      this.setState({
        isLogin: true,
        message: user + ' is Login'
      });
    }

    const that = this;
    axios.get ("/api/user/info" ,{
      params: {
        email: user
      }
    }).then (function (response){
      let users = response.data.data;
      console.log('in navbar');
      console.log(users);
      that.userAvatar = users[0].avatar;
      // that.userNF = users[0].notifications;
      // NOTE: hard coded
      that.userNF = ["Welcome to our APP!", "Spring 2018 Registration started!"];
      console.log (that.userNF);
      that.setState({
        userNF: that.userNF
      })
    }).catch (function (error) {
      console.log (error);
    });
    let email = cookies.get('login');
    email = unescape(email);
    if (email) {
      // end read csv file
      axios.get('/api/user/info', {
        params: {
          email: email
        }
      }).then((response) => {
        this.setState({
          userInfo: response.data.data[0]
        });
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  handleClick(e) {
    this.setState({ open: true, anchorEl: e.currentTarget });
  };

  handleClickMenu(e) {
    this.setState({ openMenu: true, anchorEl: e.currentTarget });
  };

  handleClickUserMenu(e) {
    this.setState({ openUserMenu: true, anchorEl: e.currentTarget });
  };

  handleClickUserNF(e){
    this.setState({ openUserNF: true, anchorEl: e.currentTarget });
  }

  handleRequestClose(e) {
    this.setState({ open: false, openMenu: false, openUserMenu: false, openUserNF: false,redirect: true });
  };

  handleNFRemoval(notification){

    let userNF = this.state.userNF
    let search_term = notification;

    for (let i=userNF.length-1; i>=0; i--) {
      if (userNF[i] === search_term) {
        userNF.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
      }
      let user = this.state.userInfo;
      user.notifications = userNF;
      axios.put('/api/user', user).then((response) => {
        if (response.status == 200) {
          console.log('update notification success');
        } else {
          console.log('update notification failed');
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    this.setState({
      userNF: userNF
    });
  }

  onChange(event, { newValue }){
    this.setState({
      value: newValue
    });
  }

  handleLogout() {
    this.props.cookies.remove('login');
  }

  onSearch(event) {
    if (event.target.value == 'cs498') {
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
    if (this.userAvatar === undefined || this.userNF === undefined) {
      return <div></div>;
      }

      const { cookies } = this.props;

      let search = '/';
      if (this.state.redirect == true) {
        search = '/class_profile';
      }
      let width = window.innerWidth;
      let height = window.innerHeight;
      const { open } = this.state.open;

      let settings = '/settings'
      if (this.state.redirect == true) {
        settings= '/settings';
      }

      if (width  > 700) {
        return (
          <div className="NavBar">
            <header className="NavBar.navHeader" id="navHeader">
              <div className="App-logo">
                <IconButton
                  className={NavBar.button}
                  href = '/status'
                  >
                  <img src='/assets/uucr.jpg' className="App-logo" alt="logo" />
                </IconButton>
              </div>
              <IntegrationAutosuggest id="navSearch" />
              <Link to={search}>
                <IconButton className="NavSearchButton" type="submit" value="Submit">
                </IconButton>
              </Link>
              <div id= "navAvatar">
                <IconButton
                  className={NavBar.button}
                  color="default"
                  aria-owns={this.state.openUserMenu ? 'simple-menu-2' : null}
                  aria-haspopup="true"
                  onClick={this.handleClickUserMenu.bind(this)}
                  >
                  <Avatar alt="sampleAvatar" src={this.userAvatar} className={NavBar.avatar} />
                </IconButton>
                <Menu
                  id="simple-menu-2"
                  anchorEl={this.state.anchorEl}
                  open={this.state.openUserMenu}
                  onRequestClose={this.handleRequestClose.bind(this)}
                  >
                  <Link to={settings}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Settings
                    </MenuItem>
                  </Link>
                  <Link to='/' onClick={this.handleLogout}>
                    <MenuItem>
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
              <IconButton
                id = "NF"
                className={NavBar.button}
                aria-owns={this.state.openUserNF ? 'simple-menu-4' : null}
                aria-haspopup="true"
                onClick={this.handleClickUserNF.bind(this)}
                >
                <Badge badgeContent={this.state.userNF.length} color="default">
                  <Notifications />
                </Badge>
              </IconButton>
              <Menu
                id="simple-menu-4"
                anchorEl={this.state.anchorEl}
                open={this.state.openUserNF}
                onRequestClose={this.handleRequestClose.bind(this)}
                >
                {this.userNF.map((notification, index) => {
                  return(
                    <MenuItem key={index} id = {index} onClick={()=> this.handleNFRemoval(notification)}>
                      {notification}
                    </MenuItem>
                  );
                })}
              </Menu>
              <div>
                <IconButton
                  id="navCD"
                  className={NavBar.button}
                  color="default"
                  aria-owns={this.state.openMenu ? 'simple-menu-1' : null}
                  aria-haspopup="true"
                  onClick={this.handleClickMenu.bind(this)}
                  >
                  <ListIcon id="navCD_ListIcon" />
                </IconButton>
                <Menu
                  id="simple-menu-1"
                  anchorEl={this.state.anchorEl}
                  open={this.state.openMenu}
                  onRequestClose={this.handleRequestClose.bind(this)}
                  >
                  <Link to={{ pathname: '/track', field: 'Software Foundations', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Software Foundations
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Algorithms and Models of Computation', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Algorithms and Models of Computation
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Intelligence and Big Data', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Intelligence and Big Data
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Human and Social Impact', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Human and Social Impact
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Media', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Media
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Scientific, Parallel, and High Performance Computing', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Scientific, Parallel, and High Performance Computing
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Distributed Systems, Networking, and Security', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Distributed Systems, Networking, and Security
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Machines', }}>
                    <MenuItem onClick={this.handleRequestClose.bind(this)}>
                      Machines
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            </header>
          </div>
        );
      }
      else {
        return (

          <div className="NavBar_cell">
            <header className="NavBar.navHeader" id="navHeader">
              <img src='/assets/uucr.jpg' className="App-logo" alt="logo" />
              <IntegrationAutosuggest id="navSearch" />
              <Link to={search}>
                <IconButton className="NavSearchButton" type="submit" value="Submit">
                </IconButton>
              </Link>
              <div className="NavMenu">
                <Button
                  id = 'navMenu_cell'
                  aria-owns={this.state.open ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick.bind(this)}
                  >
                  <MenuIcon id ="navCD_Icon_cell"  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  open={this.state.open}
                  onRequestClose={this.handleRequestClose.bind(this)}
                  >
                  <MenuItem className= "menuItem" onClick={this.handleRequestClose.bind(this)}>
                    Fields
                  </MenuItem>
                  <Link to={settings}>
                    <MenuItem className= "menuItem" onClick={this.handleRequestClose.bind(this)}>
                      Settings
                    </MenuItem>
                  </Link>
                </Menu>
              </div>


              <IconButton
                id = "NF_cell"
                className={NavBar.button}
                aria-owns={this.state.openUserNF ? 'simple-menu-4' : null}
                aria-haspopup="true"
                onClick={this.handleClickUserNF.bind(this)}
                >
                <Badge badgeContent={this.state.userNF.length} color="accent">
                  <Notifications />
                </Badge>
              </IconButton>
              <Menu
                id="simple-menu-4"
                anchorEl={this.state.anchorEl}
                open={this.state.openUserNF}
                onRequestClose={this.handleRequestClose.bind(this)}
                >
                {this.userNF.map((notification, index) => {
                  return(
                    <MenuItem id = {index} onClick={()=> this.handleNFRemoval(notification)}>
                      {notification}
                    </MenuItem>
                  );
                })}
              </Menu>

              <div>
                <IconButton
                  id="navCD_cell"
                  className={NavBar.button}
                  color="default"
                  aria-owns={this.state.openMenu ? 'simple-menu-1' : null}
                  aria-haspopup="true"
                  onClick={this.handleClickMenu.bind(this)}
                  >
                  <ListIcon id="navCD_Icon_cell" />
                </IconButton>
                <Menu
                  id="simple-menu-3"
                  anchorEl={this.state.anchorEl}
                  open={this.state.openMenu}
                  onRequestClose={this.handleRequestClose.bind(this)}
                  >
                  <Link to={{ pathname: '/track', field: 'Software Foundations', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Software Foundations
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Algorithms and Models of Computation', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Algorithms and Models of Computation
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Intelligence and Big Data', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Intelligence and Big Data
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Human and Social Impact', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Human and Social Impact
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Media', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Media
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Scientific, Parallel, and High Performance Computing', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Scientific, Parallel, and High Performance Computing
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Distributed Systems, Networking, and Security', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Distributed Systems, Networking, and Security
                    </MenuItem>
                  </Link>
                  <Link to={{ pathname: '/track', field: 'Machines', }}>
                    <MenuItem
                      className= "menuItem"
                      onClick={this.handleRequestClose.bind(this)}>
                      Machines
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            </header>
          </div>
        );
      }
    }
  }

  export default withCookies(NavBar);
