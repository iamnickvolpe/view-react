import React, { Component } from "react";
import firebase from 'firebase';
import Weather from "./widgets/Weather";
import Feed from "./widgets/Feed";
import Events from "./widgets/Events";
import Day from "./widgets/Day";
import Countdown from "./widgets/Countdown";
import Subway from "./widgets/Subway";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      widgets: [],
    };
  }

  componentDidMount() {
    const widgetsRef = firebase.database().ref('users/'+this.props.user.uid+'/widgets');
    widgetsRef.on('value', (snapshot) => {
      let widgets = snapshot.val();
      let newState = [];
      for (let widget in widgets) {
        newState.push({
          id: widget,
          type: widgets[widget].type,
          settings: widgets[widget].settings,
          data: widgets[widget].data,
        });
      }
      this.setState({
        widgets: newState
      });
    });
  }

  render() {
    return (
      <div className="dashboard">
        {// eslint-disable-next-line
        this.state.widgets.map(function(widget) {
          if(widget.type === "events") {
            return <Events key={widget.id} widget={widget} />
          } else if (widget.type === "weather") {
            return <Weather key={widget.id} widget={widget} />
          } else if (widget.type === "feed") {
            return <Feed key={widget.id} widget={widget} />
          } else if (widget.type === "day") {
            return <Day key={widget.id} widget={widget} />
          } else if (widget.type === "countdown") {
            return <Countdown key={widget.id} widget={widget}  />
          } else if (widget.type === "subway") {
            return <Subway key={widget.id} widget={widget} />
          }
        })}
      </div>
    );
  }
}

export default Dashboard;