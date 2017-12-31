import React, { Component } from "react";
import Moment from 'react-moment';

class Day extends Component {
    constructor() {
        super();
        this.state = {
          time: Date.now(),
        };
      }
    
    componentDidMount() {
        var that = this;
        setInterval(function() {
            that.setState({time: Date.now()});
        }, 1000);
    }

    render() {
        return (
            <div className="day bold">
                <div className="font-1 margin-1">
                    <div><Moment format="dddd">{this.state.time}</Moment></div>
                    <div><Moment format="MMMM">{this.state.time}</Moment></div>
                    <div><Moment format="Do">{this.state.time}</Moment></div>  
                </div>  
                <div className="font-1 normal"><Moment format="LT">{this.state.time}</Moment></div> 
            </div>
        )
    }
}

export default Day;