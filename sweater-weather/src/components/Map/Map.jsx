import { React, Component} from "react";
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import PropTypes from 'prop-types';

class Map extends Component {

  render() {

    function getBoundsZoomLevel(bounds, mapDim) {
      var WORLD_DIM = { height: 256, width: 256 };
      var ZOOM_MAX = 21;
  
      function latRad(lat) {
          var sin = Math.sin(lat * Math.PI / 180);
          var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
          return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
      }
  
      function zoom(mapPx, worldPx, fraction) {
          return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
      }
  
      var ne = bounds["northeast"];
      var sw = bounds["southwest"];
  
      var latFraction = (latRad(ne["lat"]) - latRad(sw["lat"])) / Math.PI;
  
      var lngDiff = ne["lng"] - sw["lng"];
      var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
  
      var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
      var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
  
      return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }

  const containerStyle = { width: '400px', height: '400px', borderRadius: '25px'};
  const mapTypeId = "terrain";
  const mapDim = { height: containerStyle.height.replace(/px/g,''), width: containerStyle.width.replace(/px/g,'') };
  let zoomLevel = 5; //default value
  
    const { coordinates } = this.props;

    if (coordinates){
      zoomLevel = getBoundsZoomLevel(this.props.coordinates.bounds, mapDim);

      //REMOVE KEY BEFORE COMMITING TO GIT
      return (
        <LoadScript
          googleMapsApiKey="xxx"> 
          <GoogleMap
            mapContainerStyle = {containerStyle}
            center = {this.props.coordinates.centerCoordinates}
            zoom = {zoomLevel}
            mapTypeId = {mapTypeId}
            >
            {/* yesIWantToUseGoogleMapApiInternals //this is important!
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}  */}
            
            <Polygon
              paths={this.props.coordinates.poligonCoordinates}
              key={1}
              options={{
              fillColor: "#3F4AA9",
              fillOpacity: 0.4,
              strokeColor: "#3F4AA9",
              strokeOpacity: 1,
              strokeWeight: 3}}/>
          </GoogleMap>
        </LoadScript>
      )
    }else{
      return null;
    }
  }
}

Map.propTypes = {
  coordinates: PropTypes.shape({
    centerCoordinates: PropTypes.object.isRequired,
    bounds: PropTypes.object.isRequired,
    poligonCoordinates:PropTypes.array.isRequired,
  }),
};
export default Map;