import React,{ useState } from "react";

const useForecast = () => {
    const[isError, setError] = useState(false);
    const[isLoading, setLoading] = useState(false);
    const[forecast, setForecast] = useState(null);
    
    //call api journey
    const submitRequest = location => {
        console.log({location});
    };

    return {
        isError, isLoading, forecast, submitRequest,
    };
};

export default useForecast;