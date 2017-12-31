import React, { Component } from "react";
import firebase, { auth, provider } from './firebase.js';
import './App.css';
import Header from "./components/Header";
import Weather from "./components/Weather";
import Feed from "./components/Feed";
import Events from "./components/Events";
import Day from "./components/Day";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      widgets: [],
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  componentDidMount() {
    const widgetsRef = firebase.database().ref('widgets');
    widgetsRef.on('value', (snapshot) => {
      let widgets = snapshot.val();
      let newState = [];
      for (let widget in widgets) {
        newState.push({
          id: widget,
          type: widgets[widget].type,
          settings: widgets[widget].settings
        });
      }
      this.setState({
        widgets: newState
      });
      console.log(this.state);
    });
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  render() {
    return (
      <div className="dashboard">
        <Header login={this.login} logout={this.logout} user={this.state.user} />
        {this.state.user ?
        // eslint-disable-next-line
        this.state.widgets.map(function(widget) {
          if(widget.type === "events") {
            return <Events settings={widget.settings} />
          } else if (widget.type === "weather") {
            return <Weather settings={widget.settings} />
          } else if (widget.type === "feed") {
            return <Feed settings={widget.settings} />
          } else if (widget.type === "day") {
            return <Day settings={widget.settings} />
          }
        }): null}
      </div>
    );
  }
}

export default App;