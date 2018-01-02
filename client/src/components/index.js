import React, { Component } from 'react';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import '../App.css';
import '../weather-underground-icons/wu-icons-style.min.css';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Dashboard from './protected/Dashboard';
import Settings from './protected/Settings';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

function PrivateRoute ({component: Component, authed, user, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} user={user} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

export default class App extends Component {
  state = {
    authed: false,
    loading: true,
    user: '',
  }
  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
          user: user,
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          user: null,
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <BrowserRouter>
        <div>
          <div className="header">
            {this.state.authed ?
              <button onClick={() => { logout() }}>Logout</button> 
              : 
              <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
            }
          </div>

            <Switch>
              <Route path='/' exact component={Home} />
              <PublicRoute authed={this.state.authed} path='/login' component={Login} />
              <PublicRoute authed={this.state.authed} path='/register' component={Register} />
              <PrivateRoute authed={this.state.authed} path='/dashboard' user={this.state.user} component={Dashboard} />
              <PrivateRoute authed={this.state.authed} path='/settings' user={this.state.user} component={Settings} />
              <Route render={() => <h3>No Match</h3>} />
            </Switch>

        </div>
      </BrowserRouter>
    );
  }
}
