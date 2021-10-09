function getCityCountry(str, location){
    let city = '', country = '';

    city = location;

    let parts = str.split(",");
    country = parts[parts.length - 1].replace(/"/g,"").trim(); 
   
    return {city, country}
};

export default getCityCountry;