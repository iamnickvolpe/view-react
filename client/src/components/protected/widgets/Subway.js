import React, { Component } from "react";
import Moment from 'react-moment';

class Subway extends Component {
    render() {
        return (
            <div className="subway">
                {(this.props.widget.data) ? this.props.widget.data.map((stop) => {
                    return (
                        <div key={stop.id}>
                            <div className="bold font-1 margin-3"><span style={{backgroundColor: stop.color}} className="subway__train">{stop.train}</span> {stop.name} {stop.direction}</div>
                            <div className="font-2 margin-1 normal">
                                {(stop.trips[0]) ? <div><Moment interavl={0} fromNow>{stop.trips[0] * 1000}</Moment></div>: null}
                                {(stop.trips[1]) ? <div><Moment interavl={0} fromNow>{stop.trips[1] * 1000}</Moment></div>: null}
                            </div>
                        </div>
                    )
                }): null}
            </div>
        )
    }
}

export default Subway;