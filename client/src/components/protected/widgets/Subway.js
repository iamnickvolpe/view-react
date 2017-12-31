import React, { Component } from "react";
import Moment from 'react-moment';

class Subway extends Component {
    render() {
        return (
            <div className="subway">
                {this.props.widget.data.map((stop) => {
                    return (
                        <div key={stop.id}>
                            <div className="bold font-1 margin-3">{stop.train} {stop.name} {stop.direction}</div>
                            <div className="font-2 margin-1 normal">
                                <div><Moment interavl={0} fromNow>{stop.trips[0] * 1000}</Moment></div>
                                <div><Moment interavl={0} fromNow>{stop.trips[1] * 1000}</Moment></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Subway;