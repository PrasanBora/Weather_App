
let loc =document.getElementById("location");
let tempvalue =document.getElementById("temperature");
let climate =document.querySelector(".weather");
let humidvalue =document.querySelector(".humidity");
let pressvalue =document.querySelector(".pressure");
let speedvalue =document.getElementById("speed");

let timevalue=document.querySelector(".time");
let dateValue=document.querySelector(".date");

const searchInput=document.querySelector(".searchbox");
const searchButton=document.querySelector(".button");


window.addEventListener("load" ,() =>{
    let long;
    let lat;
  
    if(navigator.geolocation)  // Data wrt Geolocation 
    {
        navigator.geolocation.getCurrentPosition( (position)=>
        {
            long=position.coords.longitude;
            lat=position.coords.latitude;
          
             const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ad2057c532aab725653dbc1f278ada52&units=metric`;
             console.log(api);
             fetch(api).then((response)=> {return response.json();  } )
             .then((data)=>{/*console.log(data)*/ transferData(data)})
        });
        transferData =(data)=>{ writeValues(data) }
    }
})


//---------------------------

    searchButton.addEventListener("click",async (e)=>{
    console.log(e);
    e.preventDefault(); 

    const city = searchInput.value;

   const api2 =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ad2057c532aab725653dbc1f278ada52&units=metric` ;
    // console.log(api2); 
     fetch(api2 ).then((response)=> {
        if (!response.ok) {
            alert("No such city found..");
          }
          return response.json();
         } )
    .then((data)=> { writeValues(data); } )
       
            
})


//---Define values of variable
 
function writeValues (data) {
    const name =data.name;
    const temp=data.main.temp ;
    const humid =data.main.humidity;
    const feel =data.main.feels_like;
    const press =data.main.pressure;
    const descrip =data.weather[0].description;
    const country=data.sys.country;
    const wind=data.wind.speed;
    const icon =data.weather[0].icon;
    // let daydate=data.timezone;


     //console.log(pressvalue,speedvalue,humidvalue,descrip);


    loc.textContent=name + "," +country;
    tempvalue.innerText=temp+ "° C";
    climate.textContent=descrip;
    speedvalue.textContent=wind+" km/h" ;
    humidvalue.innerText=humid+" %" ;
    pressvalue.innerText=press+" hpa";
 
    
    weathericon.src="http://openweathermap.org/img/wn/"+icon+"@2x.png" ;
   
   
}

///----------Default location delhi 

const defaultapi =`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=ad2057c532aab725653dbc1f278ada52&units=metric` ;
   
      fetch(defaultapi ).then((response)=> {
          return response.json(); } )
    .then((data)=> { writeValues(data); } )


    // calculating time and assigning to date and time  

const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const weekday = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];


var today = new Date();
let hours= today.getHours()
let ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;

var date = today.getDate()+' '+month[today.getMonth()]+' '+ weekday[today.getDay()];

var time = hours +":" + today.getMinutes()+' '+ ampm ;

timevalue.textContent = time;
dateValue.textContent=date;