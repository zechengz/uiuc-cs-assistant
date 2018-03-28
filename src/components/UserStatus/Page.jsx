import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import NavBar from '../NavBar/navbar.jsx';
import UserStatus from './UserStatus.jsx'

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  componentWillMount() {
    const { cookies } = this.props;
    let email = cookies.get('login');
    this.setState({
      email: email
    });
  }

  render() {
    if (this.state.email === '') {
      return <div>404 Page URL Not Exist</div>;
    }
    return (
      <div>
        <NavBar />
        <UserStatus />
      </div>
    );
  }
}

Page.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(Page);
