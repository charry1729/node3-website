const request = require("request")

const forecast = (lat,long,callback1={})=>{
//    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ&limit=1'

    const url = "http://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity="+encodeURIComponent(lat) + ","+encodeURIComponent(long)+"&access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ&limit=1"

  //  curl "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ"




    request({url,json:true},(error,response)=> {
        if(error){
            callback1('a','connection error',undefined)
        } else if(response.body.error){
            callback1('b','check url',undefined)
        } else{
            console.log("forcast",response.body);
            
            callback1(undefined,{
                latitude : response.body.features[0].center[0] ,
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name            })

        }


    })


}

// const https = require("https")

// const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/chester.json?proximity=45,75&access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ"
// const request = https.request(url,(response)=>{
    
//     let data = ''
//     response.on('data',(chunk)=>{
//         data = data + chunk.toString()
//         console.log(chunk);

//     })

//     response.on('end',()=>{
//         const body = JSON.parse(data)
//         console.log(body);

//     })
// })

// request.on('error',(error)=>{
//     console.log('error a',error);
    


// })

// request.end();



module.exports=forecast