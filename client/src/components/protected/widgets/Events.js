import React, { Component } from "react";
import Moment from 'react-moment';
import moment from 'moment';

moment.updateLocale('en', {
    relativeTime: {
      future: '%s'
    }
  });

class Events extends Component {
    arrange(data) {
        var newData = {
            today: [],
            tomorrow: [],
            future: [],
        };
        data.forEach(function(event) {
            var date = moment(event.start.date || event.start.dateTime).format('YYYY-MM-DD');
            if (date === moment().format('YYYY-MM-DD')) {
                newData.today.push(event);
            } else if (date === moment().add(1, 'days').format('YYYY-MM-DD')) {
                newData.tomorrow.push(event);
            } else {
                newData.future.push(event);
            }
        });
        return newData;
    }

    render() {
        if(this.props.widget.data) {
            var events = this.arrange(this.props.widget.data.items);
        }
        return (
            <div className="events" style={{ backgroundColor: this.props.widget.settings.backgroundColor, color: this.props.widget.settings.color }} >
                <div className="font-1 normal margin-2">{this.props.widget.settings.name}</div>

                {(events.today.length) ? 
                <div className="margin-2">
                    <div className="font-2 bold margin-3">Today</div>
                    {events.today.map((event) => {
                        return (
                            <div className="margin-3" key={event.id}>
                                <div className="bold font-3 events__summary"><span className="normal left"><Moment format="h:mma">{event.start.date || event.start.dateTime}</Moment></span> {(event.summary.includes("private"))? 'Private event': event.summary}</div>
                            </div>
                        )
                    })}
                </div> :null}

                {(events.tomorrow.length) ? 
                <div className="margin-2">
                    <div className="font-2 bold margin-3">Tomorrow</div>
                    {events.tomorrow.map((event) => {
                        return (
                            <div className="margin-3" key={event.id}>
                                <div className="bold font-3 events__summary"><span className="normal left"><Moment format="h:mma">{event.start.date || event.start.dateTime}</Moment></span> {(event.summary.includes("private"))? 'Private event': event.summary}</div>
                            </div>
                        )
                    })}
                </div> :null}

                {(events.future.length) ? 
                <div>
                    {(events.tomorrow.length || events.future.length)?<div className="font-2 bold margin-3">Beyond</div>: null}
                    {events.future.map((event) => {
                        return (
                            <div className="margin-3" key={event.id}>
                                <div className="bold font-3 events__summary"><span className="normal left"><Moment fromNow>{event.start.date || event.start.dateTime}</Moment></span> {(event.summary && event.summary.includes("private"))? 'Private event': event.summary}</div>
                                <div className="normal font-4"><Moment format="dddd MMMM Do h:mma">{event.start.date || event.start.dateTime}</Moment></div>
                            </div>
                        )
                    })}
                </div> :null}

            </div>
        )
    }
}

export default Events;