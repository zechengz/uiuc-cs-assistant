import React, {Component} from 'react';

import NavBar from '../NavBar/navbar.jsx'

import ProfileUserStarter from '../Profile/ProfileStarter/profileUserStarter.jsx';

class ProfilePage extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <ProfileUserStarter />
      </div>
    );
  }
}

export default ProfilePage
