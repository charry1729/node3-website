console.log("new js working");

const url = 'http://puzzle.mead.io/puzzle' 
fetch(url).then((response)=>{
    //console.log(response);
    response.json().then((data1)=>{

    console.log(data1);
    } )        } );


//const address = 'india'


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


const messageone = document.querySelector('.message-1')
const messagetwo = document.querySelector('.message-2')



weatherForm.addEventListener('submit',(event)=>{

event.preventDefault()
console.log('testing');
const location = search.value
console.log(location);

const url2 = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ&limit=1'


// if(location.length===0){
//     console.log("enter the location");
//     }else  {
        fetch(url2).then((response)=>{
            response.json().then((data,error)=>{
        
                if(location.length===0){
                    console.log("unable to connect to internet",undefined)
                    messageone.textContent = 'enter location data'

                //  } else if ((data.body).length ===0 ){
                //     console.log("error occured")
                } else {
                    //console.log(data.location,data.forecast);
                    console.log(data.features[0].center[0],data.features[0].center[1] ,data.features[0].place_name);
                    const lat = data.features[0].center[0] 
                    const long = data.features[0].center[1] 
                    const location = data.features[0].place_name
                    //messagetwo.textContent = 'Loading'
                    messageone.textContent = 'The latitude is '+lat+', The longitude is '+long+' for the Location '+location
                    //messageone.textContent = location
                    console.log(messageone.textContent);
//                    console.log(messageone.textContent);

                }  
                })
            });
        
        
        
        
   // }




})
                                                            