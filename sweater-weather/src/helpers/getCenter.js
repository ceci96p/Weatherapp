import Geocode from "react-geocode";

const getCenter = async (city,country) => {

    Geocode.setApiKey(""); //REMOVE API KEY BEFORE COMMITING TO GIT
    
    const response = await Geocode.fromAddress(city + " " + country);

    const { lat, lng } = response.results[0].geometry.location;
    const centerCoordinates = {lat:lat,lng:lng};
    const bounds  = response.results[0].geometry.viewport;

      return {centerCoordinates,bounds};
  }

export default getCenter;
