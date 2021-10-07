import { useState } from "react";
import axios from "axios";

import getCurrentDayForecast from "../helpers/getCurrentDayForecast";
import getCurrentDayDetailedForecast from "../helpers/getCurrentDayDetailedForecast";
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";
//import getLatLng from "../helpers/getLatLng";
//import getCenter from "../helpers/getCenter";


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
        const {data} = await axios(`${REQUEST_URL}/search`,{params: {query: location}});
        
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
        setLoading(false);
    };

    const getCityCoord = async location => {
        const {data} = await axios(`${REQUEST_URL_MAP}/search.php?q=${location}&polygon_geojson=1&format=json&limit=2`);
    
        if(!data || data.length === 0){
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        //const poligonCoordinates = getLatLng(data[1]["geojson"]["coordinates"][0][0]);
        //const centerCoordinates = getCenter(data[1]["geojson"]["coordinates"][0][0]);
        //setCoordinates({poligonCoordinates,centerCoordinates});

        const poligonCoordinates = { lat: 24.886, lng: -70.268 };
        const centerCoordinates = { lat: 24.886, lng: -70.268 };
        setCoordinates({poligonCoordinates,centerCoordinates});



        //console.log(JSON.stringify(coordinates)); //REMOVE
        return coordinates;
    }


    //call api
    const submitRequest = async location => {
        setLoading(true);
        setError(false);
        const response = await getWoeid(location);
        if (!response?.woeid) return;

        const data = await getForecastData(response.woeid);
        if (!data) return;

        const coord = await getCityCoord(location);
        if (!coord) return;

        gatherForecastData(data);
    };

    return {
        isError, isLoading, forecast, coordinates, submitRequest,
    };
};

export default useForecast;




