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


  class App extends React.Component {
   render() {
    return (
     <div>
      <Titles />
      <Form />
      <Weather />
     </div>
    ) 
  }
}
export default App;
