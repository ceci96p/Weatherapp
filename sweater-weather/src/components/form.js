import React from 'react';
class Form extends React.Component{
	render(){
	  return (
	       <form onSubmit= {this.props.loadWeather}>
	         <input type="text" name="city_name" placeholder="City..." />
	         <input type="text" name="country_code" placeholder="Country..." />
	         <button> Get Weather </button>
	      </form> 
	  )
	}
};
export default Form;