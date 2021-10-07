import { React, Component} from "react";
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

const Map = ({ coordinates }) => {

    const containerStyle = { width: '400px', height: '400px', borderRadius: '25px'};

    const center = { lat: 24.886, lng: -70.268 };

    const zoom = 4;

    const mapTypeId = "terrain";

    //console.log("center" + coordinates.centerCoordinates);
    //console.log(coordinates.poligonCoordinates);
    

    const coords = [{ lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }];

            return (
              <LoadScript
                googleMapsApiKey="AIzaSyDLXzp2aTJHEWLUfKC8yaucNMUy4XNWH3k">
                <GoogleMap
                  mapContainerStyle = {containerStyle}
                  center = {center}
                  zoom = {zoom}
                  mapTypeId = {mapTypeId}>
                  
                  <Polygon
                    path={coords}
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
}
export default Map;

// const containerStyle = { width: '400px', height: '400px', borderRadius: '25px'};

// const center ={ lat: 24.886, lng: -70.268 };

// const zoom = 4;

// const mapTypeId = "terrain";

// const coords = [{ lat: 25.774, lng: -80.19 },
// { lat: 18.466, lng: -66.118 },
// { lat: 32.321, lng: -64.757 },
// { lat: 25.774, lng: -80.19 }];

// // const handleApiLoaded = (map, maps) => {

// //     console.log('It works');

// //     const triangleCoords = [
// //       { lat: 25.774, lng: -80.19 },
// //       { lat: 18.466, lng: -66.118 },
// //       { lat: 32.321, lng: -64.757 },
// //       { lat: 25.774, lng: -80.19 }
// //     ];
  
// //      var bermudaTriangle = new maps.Polygon({
// //       paths: triangleCoords,
// //       strokeColor: "#FF0000",
// //       strokeOpacity: 0.8,
// //       strokeWeight: 2,
// //       fillColor: "#FF0000",
// //       fillOpacity: 0.35
// //     });
// //     bermudaTriangle.setMap(map);
// //   };


// class Map extends Component {

//   render() {
//     return (
//       <LoadScript
//         googleMapsApiKey="AIzaSyDLXzp2aTJHEWLUfKC8yaucNMUy4XNWH3k">
//         <GoogleMap
//           mapContainerStyle = {containerStyle}
//           center = {center}
//           zoom = {zoom}
//           mapTypeId = {mapTypeId}
//           >
//           {/* yesIWantToUseGoogleMapApiInternals //this is important!
//           onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}  */}
          
//           <Polygon
//             path={coords}
//             key={1}
//             options={{
//             fillColor: "#3F4AA9",
//             fillOpacity: 0.4,
//             strokeColor: "#3F4AA9",
//             strokeOpacity: 1,
//             strokeWeight: 3}}/>
         
//         </GoogleMap>
//        </LoadScript>
//     )
//   }
// }
//export default Map;


