import React, { Component } from "react";

class Weather extends Component {
  render() {
    const data = this.props.widget.data;
    return (
      <div className="weather">
        <div>
          <div className="margin-1 font-1">
            <div><span className="normal">Currently </span><span className="bold">{data.current_observation.temp_f}&deg;</span></div>
            <div><span className="normal">Feels like </span><span className="bold">{data.current_observation.feelslike_f}&deg;</span></div>
            <div className="bold">{data.current_observation.weather}</div>
          </div>
          
          <div className="margin-1 font-1">
            <div><span className="normal">High </span><span className="bold">{data.forecast.simpleforecast.forecastday[0].high.fahrenheit}&deg;</span></div>
            <div><span className="normal">Low </span><span className="bold">{data.forecast.simpleforecast.forecastday[0].low.fahrenheit}&deg;</span></div>
          </div>

          <div className="margin-1 font-1"><span className="normal">Tomorrow </span><span className="bold">{data.forecast.simpleforecast.forecastday[1].high.fahrenheit}&deg;/{data.forecast.simpleforecast.forecastday[1].low.fahrenheit}&deg; {data.forecast.simpleforecast.forecastday[1].conditions}</span></div>
        </div>
      </div>
    );
  }
}

export default Weather;