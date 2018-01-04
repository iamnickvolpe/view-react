import React, { Component } from "react";
import Moment from 'react-moment';
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
            var busStops = this.props.widget.data.bus;
            busStops.forEach(function(stop) {
                if (stop.journies) {
                    stop.journies.sort(function(a, b){return a.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.DistanceFromCall - b.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.DistanceFromCall; });
                    stop.journies.slice(0, 2);
                }
            });
        }
        return (
            <div className="subway">
                <div>
                    {subwayStops.map((stop, i) => {
                        return (
                            <div key={i}>
                                <div className="bold font-1 margin-3"><span style={{backgroundColor: stop.color}} className="subway__train">{stop.train}</span> {stop.name} {stop.direction}</div>
                                <div className="font-2 margin-1 normal">
                                    {(stop.trips) ? stop.trips.map((trip, i) => {
                                        return <div key={i}><Moment fromNow interval={0}>{trip * 1000}</Moment></div>
                                    }): null}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div>
                    {busStops.map((stop, i) => {
                        return (
                            <div key={i}>
                                <div className="bold font-1 margin-3">{stop.line} {stop.to}</div>
                                <div className="font-2 margin-1 normal">
                                    {(stop.journies) ? stop.journies.map((trip, i) => {
                                        return <div key={i}>{trip.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.PresentableDistance} ({trip.MonitoredVehicleJourney.MonitoredCall.Extensions.Distances.StopsFromCall} stops)</div>
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