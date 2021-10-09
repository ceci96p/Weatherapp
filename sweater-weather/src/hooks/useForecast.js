import { useState } from "react";
import axios from "axios";

import getCurrentDayForecast from "../helpers/getCurrentDayForecast";
import getCurrentDayDetailedForecast from "../helpers/getCurrentDayDetailedForecast";
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";
import getLatLng from "../helpers/getLatLng";
import getCenter from "../helpers/getCenter";
import getCityCountry from "../helpers/getCityCountry";

const BASE_URL = 'https://www.metaweather.com/api/location';
const GEO_URL = 'https://nominatim.openstreetmap.org';
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
//const CROSS_DOMAIN = 'https://murmuring-brook-68134.herokuapp.com/';
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;
const REQUEST_URL_MAP = `${CROSS_DOMAIN}/${GEO_URL}`;


const useForecast = () => {
    const[isError, setError] = useState(false);
    const[isLoading, setLoading] = useState(false);
    const[forecast, setForecast] = useState(null);
    const[coordinates, setCoordinates] = useState(null);
    
    const getWoeid = async location => {
        const { data } = await axios(`${REQUEST_URL}/search`,{params: {query: location}});
        
        if (!data || data.length === 0){
            // set on error
            setError('There is no such location');
            setLoading(false);
            return;
        }

        return data[0];
    };

    const getForecastData = async woeid => {
        const {data} = await axios(`${REQUEST_URL}/${woeid}`);

        if(!data || data.length === 0){
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        return data;
    };

    const gatherForecastData = data => {
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0], data.title);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

        setForecast({currentDay,currentDayDetails,upcomingDays});
        //setLoading(false);
    };

    const getCityCoord = async (locationName) => {

        const {data} = await axios(`${REQUEST_URL_MAP}/search.php?q=${locationName}&polygon_geojson=1&format=json`);

        if(!data || data.length === 0){
            setError('Something went wrong');
            setLoading(false);
            return;
        }
        return data;
    };

    const gatherCoordinateData =  async (coordinateData,location) => {
        
        //get city and country
        //const {city, country} = getCityCountry(JSON.stringify(coordinateData[1]['display_name']),location);
        const {city, country} = getCityCountry(JSON.stringify(coordinateData[1]['display_name']),location);
        //get map center coordinates and zoom level from city and country information

        //If this ever gets expanded to specify a city's location based on administrative region and country 
        //keep in mind coordinateData can have more than 2 results
        let rawPoligonCoordinates = coordinateData[1]["geojson"]["coordinates"][0];
        let valueType1 = coordinateData[0]["geojson"]["type"];
        let valueType2 = coordinateData[1]["geojson"]["type"];
        let polygonType;

        if(valueType1 === 'MultiPolygon' || valueType2 === 'MultiPolygon'){
            polygonType = "MultiPolygon";
            if(valueType1 === "MultiPolygon"){
                rawPoligonCoordinates = coordinateData[0]["geojson"]["coordinates"];
            }else{
                rawPoligonCoordinates = coordinateData[1]["geojson"]["coordinates"];
            }
        }else{
                polygonType = "Polygon";
                rawPoligonCoordinates = coordinateData[0]["geojson"]["coordinates"];
        }

        const poligonCoordinates = getLatLng(polygonType,rawPoligonCoordinates);
        const data = await getCenter(city, country);

        if(!data|| data === 0){
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        const centerCoordinates = data.centerCoordinates;
        const bounds = data.bounds;
        
        setCoordinates({poligonCoordinates,centerCoordinates,bounds});
        
    };

    //call api
    const submitRequest = async location => {
        setLoading(true);
        setError(false);
        setForecast(null);
        
        const response= await getWoeid(location);
        if (!response?.woeid) return;

        const data = await getForecastData(response.woeid);
        if (!data) return;
        gatherForecastData(data);

        const coordinateData = await getCityCoord(response.title);
        if (!coordinateData) return;
        gatherCoordinateData(coordinateData,location);

        setLoading(false);
    };

    return {
        isError, isLoading, forecast, coordinates, submitRequest,
    };
};

export default useForecast;









