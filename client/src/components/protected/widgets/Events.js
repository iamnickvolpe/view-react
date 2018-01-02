import React, { Component } from "react";
import Moment from 'react-moment';

class Events extends Component {
    render() {
        return (
            <div className="events" style={{ backgroundColor: this.props.widget.settings.backgroundColor, color: this.props.widget.settings.color }} >
                <div className="font-1 bold margin-1">{this.props.widget.settings.name}</div>
                    {(this.props.widget.data && this.props.widget.data.items) ? this.props.widget.data.items.map((event) => {
                        return (
                            <div className="margin-2" key={event.id}>
                                <div className="bold font-2 events__summary">{(event.summary.includes("private"))? 'Private event': event.summary}</div>
                                <div className="normal font-3"><Moment format="dddd MMMM Do @ h:mma">{event.start.date || event.start.dateTime}</Moment> (<Moment fromNow>{event.start.date || event.start.dateTime}</Moment>)</div>
                            </div>
                        )
                    }): null}
            </div>
        )
    }
}

export default Events;