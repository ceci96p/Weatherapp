import React from 'react';
class Weather extends React.Component{
	render(){
		return(
			<div>
			{this.props.city && this.props.country && <p> Location: {this.props.city}, {this.props.country}</p>}	
			{this.props.temperature && <p> Temperature :{this.props.temperature}</p>}
			{this.props.min_temperature && this.props.max_temperature && <p> Temperature range: Min:{this.props.min_temperature} - Max:{this.props.max_temperature}</p>}
			{this.props.main_state && this.props.description && <p> Weather: {this.props.main_state},{this.props.description}</p>}
			{this.props.humidity && <p> Humidity: {this.props.humidity}</p>}
			{this.props.visibility && <p> Visibility: {this.props.visibility}</p>}
			{this.props.pressure && <p> Pressure: {this.props.pressure}</p>}
			{this.props.speed && <p> Wind speed: {this.props.wind}</p>}
			{this.props.error && <p> Error: {this.props.error} </p>}
			</div>
		);
	}
};
export default Weather;

