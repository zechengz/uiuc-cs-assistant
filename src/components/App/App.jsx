import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// includes all page components
import Home from '../Home/Home.jsx'
import UserStatusPage from '../UserStatus/Page.jsx';
import ProfilePage from '../Profile/Page.jsx';
import Login from '../Login/Login.jsx';
import Register from '../Register/Register.jsx';
import Settings from '../Settings/settings.jsx';
import UserProfilePage from '../Profile/User.jsx';
import TrackField from '../TrackField/TrackField.jsx';

const App = () => (
  <CookiesProvider>
    <Router>
      <Switch>
        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/user_profile" component={UserProfilePage}/>
        <Route exact path="/status" component={UserStatusPage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/settings" component={Settings}/>
        <Route path="/track" component={TrackField}/>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
  </CookiesProvider>
)

export default App
