import React, { Component } from "react";
//import Moment from 'react-moment';
import moment from 'moment';

class Subway extends Component {
    arrange(data) {
        var newData = [];
        data.forEach(function(stop) {
            var newTrips = [];
            stop.trips.forEach(function(trip) {
                if (trip > moment().unix()) {
                    newTrips.push(trip);
                }
            });
            newTrips.sort();
            newTrips = newTrips.slice(0,2);
            newData.push({
                color: stop.color,
                direction: stop.direction,
                name: stop.name,
                train: stop.train,
                trips: newTrips,
            });
        });
        return newData;
    }
    
    render() {
        if(this.props.widget.data.subway) {
            var subwayStops = this.arrange(this.props.widget.data.subway);
        }
        if(this.props.widget.data.bus) {
            var newStops = this.props.widget.data.bus.map(function(val) {
                if(val.journies) {
                    val.journies = val.journies.sort(function(a, b){return a.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.DistanceFromCall - b.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.DistanceFromCall; });
                    val.journies = val.journies.slice(0, 2);
                }
                return val;
            });
            newStops.sort(function(a, b) {return a.order - b.order;});
            console.log(newStops.order);
        }
        return (
            <div className="subway">
                <div>
                    {subwayStops.map((stop) => {
                        return (
                            <div key={stop.direction}>
                                <div className="bold font-1 margin-3"><span style={{backgroundColor: stop.color}} className="subway__train">{stop.train}</span> {stop.name} {stop.direction}</div>
                                <div className="font-2 margin-1 normal">
                                    {(stop.trips) ? stop.trips.map((trip, i) => {
                                        return <div key={i}>{moment(trip * 1000).fromNow()}</div>
                                    }): null}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {newStops.map((stop, u) => {
                        return (
                            <div key={u}>
                                <div className="bold font-1 margin-3">{stop.line} {stop.stop} {stop.to}</div>
                                <div className="font-2 margin-1 normal">
                                    {(stop.journies) ? stop.journies.map((trip, i) => {
                                        return <div key={i}>{trip.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.PresentableDistance} {(trip.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime) ? <span> ({moment(trip.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime).fromNow()})</span>: null}</div>
                                    }): null}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}

export default Subway;