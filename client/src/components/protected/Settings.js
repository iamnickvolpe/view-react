import React, { Component } from "react";
import firebase from 'firebase';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      widgets: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var widget = JSON.parse(e.target.attributes.data.value);
    const ref = firebase.database().ref('users/'+this.props.user.uid+'/widgets/'+widget.id+'/settings/color');
    ref.set(e.target.value);
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
          settings: widgets[widget].settings
        });
      }
      this.setState({
        widgets: newState
      });
    });
  }

  render() {
    let that = this;
    return (
      <div className="settings">
        <div>{this.props.user.email}</div>
        {// eslint-disable-next-line
        this.state.widgets.map(function(widget) {
          return ( <div className="settings__widget" key={widget.id}>
            <div>{widget.type}</div>
                <div><input onBlur={that.handleChange} data={JSON.stringify(widget)} defaultValue={widget.settings.color}></input></div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Settings;