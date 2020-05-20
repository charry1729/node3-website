const request = require("request")


const geocode = (address,callback={})=>{

   // const url = "http://api.weatherstack.com/current?access_key=5c819adac5a9e7147b2249d171b658cf&query="+encodeURIComponent(address)+"&units=f"
    
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ&limit=1'
    request({url,json:true} ,(error,response)=> {
    //console.log(response.body);
    
    if(error){
        callback("unable to connect to internet",undefined)
      
     } else if (response.body.features.length ===0 ){
        callback("error occured",undefined)
    } else {
        callback(undefined,{
            latitude : response.body.features[0].center[0] ,
            longitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
        })
    }

});

}

module.exports=geocode