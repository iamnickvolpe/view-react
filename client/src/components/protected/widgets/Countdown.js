import React, { Component } from "react";
import moment from 'moment';

class Countdown extends Component {
    constructor() {
        super();
        this.state = {
          days: '',
          hours: '',
          minutes: '',
          seconds: ''
        };
    }

    componentDidMount() {
        const that = this;
        setInterval(function() {
            let currentTime = moment();
            let diff = moment.duration(moment(that.props.widget.settings.date).diff(currentTime, 'milliseconds'));
            that.setState({ 
                days: Math.floor(diff.asDays()),
                hours: diff._data.hours,
                minutes: diff._data.minutes,
                seconds: diff._data.seconds,
            });
        }, 1000);
    }

    render() {
        return (
            <div className="countdown" style={{ 
                backgroundColor: this.props.widget.settings.backgroundColor, 
                color: this.props.widget.settings.color, 
                backgroundImage: `url(${this.props.widget.settings.backgroundImage})`
                }} >
                <div className="bold margin-3 font-1">{this.props.widget.settings.title}</div>
                <div className="font-2">
                    <div><span className="bold">{this.state.days} </span><span className="normal">days</span></div>
                    <div><span className="bold">{this.state.hours} </span><span className="normal">hours</span></div>
                    <div><span className="bold">{this.state.minutes} </span><span className="normal">minutes</span></div>
                    <div><span className="bold">{this.state.seconds} </span><span className="normal">seconds</span></div>
                </div>
            </div>
        )
    }
}

export default Countdown;