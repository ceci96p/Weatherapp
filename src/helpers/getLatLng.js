function getLatLng(polygonType,coordinates){
    const formattedCoordinates = [];
    
    if (polygonType === "Polygon" ){
        coordinates.map((level1,index) => { 
            formattedCoordinates[index] = [];
            return level1.forEach((i) => {
                formattedCoordinates[index].push({ lat: parseFloat(`${i[1]}`), lng:parseFloat(`${i[0]}`)});
            })
        })
    }

    if (polygonType === "MultiPolygon"){
        coordinates.map((level1,index) => { 
            formattedCoordinates[index] = [];
            return level1.map((level2) => { 
                return level2.forEach((i) => {
                    formattedCoordinates[index].push({ lat: parseFloat(`${i[1]}`), lng: parseFloat(`${i[0]}`)});
                })
            })
        })
    }
            
    return formattedCoordinates; 
};

export default getLatLng;