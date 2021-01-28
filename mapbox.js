require('dotenv').config();

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocondingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });


async function geocoder(location){
  try{
    let response =  await geocondingClient
    .forwardGeocode({
      query: location,
      limit: 1,
  
    })
    .send();
    console.log(response.body.features[0].geometry.coordinates);

  } catch(err){
    console.log(err.message);
  }
 
}

geocoder('Manila , Makati');