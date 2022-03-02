# Sweater Weather

![Screenshot example](public/assets/ScreenshotExample)
 
## Project Description:
Sweater Weather is a searchable weather app providing the most up-to-date weather forecast conditions, day of the week predictions and map location in a simple yet pleasant to the eyes UI.

## Use Project on Heroku: 
https://cm-sweater-weather-app.herokuapp.com/

## How to Run Locally:

  1. Make sure you have Node.js and npm installed.

  2. Open terminal and change directory into the project.
  
  	… 
  	
  	cd Weatherapp

  3. Download all project dependencies.
 	
	npm install
	  
  4. Start node server/server.js.
 	
	npm start

  5. Open new terminal window without closing the previous one and again go into the project.
  	
	…
	
	cd Weatherapp

  6. In this new terminal create a new production build.
  	
	npm run build

  7. Open browser to port 3000.
  	http://localhost:3000

## Tech Stack:

  Core:
  - ReactJS
  - Hooks
  - CSS
  
  Communication:
  - Axios
  - CORS Anywhere
  
  Hosting:
  - Heroku
  
  API:
  - MetaWeather 
  - Google Maps 
  - Nominatim

## Minor bugs:
- Map loads with a delay from the rest of the UI
- User can’t specify details about the city being searched like country, then causing the probability of a bug where the weather data and the map outline don’t actually match the same location. This problem would be fixed with the implementation of an autogenerated dropdown list that specifies the country among other details to avoid any mismatch between APIs.

## Future Implementations:
- Search bar that generates a dropdown list of suggested and available city names as user types in. 
- Change the “mountain” background image according to the city.
- Use choropleth (2 color spectrum) color scheme related to current temperature for the hue of the “mountain” image.

## Learning Challenges:
- Adapt the existing project to project requirements.
- Learn advanced ReactJS concepts like hooks.
- Clone CORS Anywhere project to host it in my Heroku account to then make a call to the clone from inside the project.
- Hide API keys and limit Google API calls, when Google Maps API makes keys forcefully public.
- Learn how to use Google Maps components and overcome its limitations.
- Coordinate multiple APIs data to match each other through API calls.
- Deploy project to Heroku.

## Acknowledgments:
- Base code for the project inspired on danascript react weather app https://theultimateapichallenge.com/weather-api-react
