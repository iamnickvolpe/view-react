import React, { Component } from "react";
import Moment from 'react-moment';

class Events extends Component {
    render() {
        return (
            <div className="events" style={{ backgroundColor: this.props.widget.settings.color }} >
                    {this.props.widget.data.items.map((event) => {
                        return (
                            <div className="events__event" key={event.id}>
                                <div className="events__summary">{event.summary}</div>
                                <div className="events__time"><Moment fromNow>{event.start.date || event.start.dateTime}</Moment></div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default Events;