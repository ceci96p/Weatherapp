function getLatLng(coordinates){
    const formattedCoordinates = [];
    let counter = 0;

    coordinates.map((item) => 
        item.forEach((i) => {
            if(counter%2 === 0){
            formattedCoordinates.push({ lat: `${item[0]}`, lng: `${item[1]}`});
            }
            counter++;
    }));
    return formattedCoordinates; 
};

export default getLatLng;
    

    