const path = require("path")

const express = require("express")
const request = require("request")

const hbs = require("hbs")
const app = express();
const port = process.env.port || 3003

const forecast= require("./utils/forecast.js")
const geocode= require("./utils/geocode.js")

const codedir = path.join(__dirname,'../public')
console.log(codedir);
app.set('view engine','hbs')

console.log("__dirname",__dirname);


const viewdir = path.join(__dirname,'templates/views')
console.log(viewdir);

const partialsdir = path.join(__dirname,'templates/partials')
console.log(partialsdir);

hbs.registerPartials(partialsdir) 
app.set('views',viewdir)

app.use(express.static(codedir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Chary'
    })
});

app.get('/help',(req,res)=> {

    res.render('help',{
        helptext:'Help text',
        title: 'Help page',
        name: 'Chary'
    })
    
});
app.get('/about',(req,res)=> {

    res.render('about',{
        helptext:'Help text',
        title: 'About page',
        name: 'Chary'
    })
    
});
app.get('/help/*',(req,res)=> {

    res.send({
        errorMessage:'404 not found'})
    
})

// app.get('',(req,res)=>{
//      res.send('hello express')

// });


app.get('/weather?address=',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error:"plz provide search term"
        })
    } else {
        geocode(req.query.address,(error,data)=>{
            if(error){
              return res.send('error : ',error);
            }
            forecast(data, (error, forecastdata) => {
              if(error){
                return res.send('error : ',error);
              }
              console.log('Error', error)
              console.log(data.location);
            
              console.log('Data', forecastdata)
              res.send({forecast: forecastdata,
                        location,
                    address:req.query.address})
            })
          });
          
    }
    console.log(req.query.address);










    // const url = 'http://api.weatherstack.com/current?access_key=5c819adac5a9e7147b2249d171b658cf&query='+req.query.address
    //     request( { url: url,json: true},(error,response) => {
    //         console.log("it is currently "+ response.body.current.temperature+
    //       " Celsius outside "+ "and it feels like "+ response.body.current.feelslike
    //         );   
    //     res.send({
    //             temp : response.body.current.temperature,
    //             feelslike:response.body.current.feelslike,
    //             address: req.query.address
    //         })
    // })
    
});


app.get('/products',(req,res)=>{

    if (!req.query.search) {
        return res.send({
            error:"plz provide search term"
        })
    } 
    console.log(req.query.search);
    
    res.send({
    products:[]
    })
});

app.get('*',(req,res)=> {

    res.render('404',{title:'404',
        name:'Chary',
    errorMessage:'404 not found'})
    
})


// app.post('/weather',(address,response1)=> {

//     const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/india.json?access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ&limit=1'
// //    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibW91bmljaGFyeSIsImEiOiJja2EyY3VvbjkwMjNmM2Vsa3QyZGw4OGFpIn0.BtZKHvbglkrijuDN1ASppQ&limit=1'
//     request({url,json:true} ,(error,response)=> {
//          console.log(address);
         
//          if(error){
//             console.log("unable to connect to internet",undefined);
          
//          } else if (response.body.features.length ===0 ){
//            console.log("error occurred",undefined);
//          } else {
//              console.log(
//                 "latitude : "+response.body.features[0].center[0] +
//                 "longitude: "+response.body.features[0].center[1]+
//                 "location: "+response.body.features[0].place_name)
//          }
//      })
// res.send(200)
// });


// app.get('/about',(req,res)=> {
// console.log("aboutg");

// res.send(200)
    
// })


//console.log(__dirname);
//console.log(__filename);

// console.log(path.join(__dirname,'../public'));




app.listen(port,()=>{
    console.log("server is up")
});



