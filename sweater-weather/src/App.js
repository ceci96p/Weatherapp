// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import Titles from './components/titles.js';
import Form from './components/form.js';
import Weather from './components/weather.js';

//var API_key = "aae7ab4cdc2542da75e6764024e9819d";

  class App extends React.Component {
    state  = {
      temperature:undefined,
      city: undefined,
      country: undefined,
      min_temperature:undefined,
      max_temperature:undefined,
      main_state:undefined,
      description:undefined,
      humidity:undefined,
      visibility:undefined,
      pressure:undefined,
      wind:undefined,
      error: undefined,
    }

  getWeather = async (e) => {
    const API_ID = `aae7ab4cdc2542da75e6764024e9819d`;
    const city = e.target.elements.city_name.value;
    const country = e.target.elements.country_code.value;

    e.preventDefault();

    //await fetch(url).then(async (response)=> {await console.log(response.json())});
    var url = `http://api.openweathermap.org/data/2.5/weather?q=` + city + ',' + country + `&APPID=` + API_ID ; 
    const api_call = await fetch(url);
    const response = await api_call.json();
    console.log(response);

     if (city && country){
      this.setState({
        temperature: response.main.temp,
        city:response.name,
        country:response.sys.country,
        min_temperature:response.main.temp_min,
        max_temperature:response.main.temp_max,
        main_state:response.weather[0].main,
        description: response.weather[0].description,
        humidity: response.main.humidity,
        visibility: response.visibility,
        pressure: response.main.pressure,
        wind: response.wind.speed,
        error: undefined,
      });
     }else
      this.setState({
        temperature:undefined,
        city: undefined,
        country: undefined,
        min_temperature:undefined,
        max_temperature:undefined,
        main_state:undefined,
        description:undefined,
        humidity:undefined,
        visibility:undefined,
        pressure:undefined,
        wind:undefined,
        error: undefined,
        error: "Please enter the valid values",
      });
  }
  
   render() {
    return (
     <div>
      <Titles />
      <Form loadWeather={this.getWeather}/>//allows props to get function in form
      <Weather 
        temperature={this.state.temperature}
        city={this.state.city}
        country={this.state.country}
        min_temperature={this.state.min_temperature}
        max_temperature={this.state.max_temperature}
        main_state={this.state.main_state}
        description={this.state.description}
        humidity={this.state.humidity}
        visibility={this.state.visibility}
        pressure={this.state.pressure}
        wind={this.state.wind}
        error={this.state.error}
        />
     </div>
    );
  } 

};
export default App;
