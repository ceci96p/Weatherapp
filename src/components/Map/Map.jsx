import { React, Component} from "react";
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';
import PropTypes from 'prop-types';

class Map extends Component {

  state = {
    dimensions: null,
  };

  constructor(props) {
    super(props);

    this.containerStyle = { height: '300px', width: '100%', maxwidth:'600px', borderRadius: '25px', position: 'absolute', paddingLeft: '0px'};
    this.mapTypeId = "terrain";
    this.zoomLevel = 5; 
    this.mapWidth = 300;
    this.mapHeight = 300;
}

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
  }
  
  getBoundsZoomLevel(bounds, mapDim) {
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

  renderContent() {
    const { dimensions } = this.state;

    //change hardcoded height if the map heigth is ever to change. This could could cause a bug in the future
    this.zoomLevel = this.getBoundsZoomLevel(this.props.coordinates.bounds, { height: 300, width:  dimensions.width});

    //REMOVE API KEY BEFORE COMMITING TO GIT
    return (
      <div>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GMAPSJS}> 
          <GoogleMap
          id="google-map"
            mapContainerStyle = {this.containerStyle}
            center = {this.props.coordinates.centerCoordinates}
            zoom = {this.zoomLevel}
            mapTypeId = {this.mapTypeId}
            >
            
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
       
      </div>
    );
}

  render() {
    const { coordinates } = this.props;
    const { dimensions } = this.state;
      return (
        <div id="map" ref={el => (this.container = el)} style={this.containerStyle} >
        {dimensions &&  coordinates && this.renderContent()}
        </div>
      )
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