$(document).ready(function() {

if (navigator.geolocation) { //Grab position with navigator
        navigator.geolocation.getCurrentPosition(setpos);
    }

});

function itFailed(res){
  console.log(res);
  $(".output").html("<h3>Sorry we were unable to find your location.</h3>");
}

function setpos(pos){ //Get info from openweathermap.org with position info
  $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+pos.coords.latitude+"&lon="+pos.coords.longitude+"&units=imperial&appid=a9bcf4f4899aaab6b7194e3f674f162b").done(update).fail(itFailed);
}

var Temp=0; //Variable to store the Temp
var FC = true; //Boolean to toggle between F and C

function toggleTemp()
{
  if(FC)//Currently in F
    {
      Temp=(Temp-32)*(5/9);
      FC=false;
      $(".temp").text("C");
    }
  else //Currently in C
    {
      Temp=(Temp*(9/5))+32;
      FC=true;
      $(".temp").text("F");
    }
 $(".tempReadout").text(Temp.toPrecision(2)); 
}

function update(res)
{
  Temp=res.main.temp.toPrecision(2); //F by default
  //----------Set background---------------
  
  
  //Thunderstorm
  if(res.weather[0].id>=200 && res.weather[0].id<=232){  $("body").css("background","url('https://upload.wikimedia.org/wikipedia/commons/0/0c/Rooymans2000_-_Morning_Lightning_Strike_in_Singapore_(by).jpg')"); }

    //Drizzle
  if(res.weather[0].id>=300 && res.weather[0].id<=321){  $("body").css("background","url('http://s0.geograph.org.uk/geophotos/04/76/64/4766403_e1f206bf.jpg')"); }
  
  //Rain
  if(res.weather[0].id>=500 && res.weather[0].id<=531){  $("body").css("background","url('https://c1.staticflickr.com/1/50/155406169_2bcb8c025f_b.jpg')"); }
  
  //Snow
  if(res.weather[0].id>=600 && res.weather[0].id<=622){  $("body").css("background","url('http://res.freestockphotos.biz/pictures/9/9250-snow-covered-trees-pv.jpg')"); }
  
  //Atmosphere
  else if(res.weather[0].id>=701 && res.weather[0].id<=781){ $("body").css("background","url('http://s0.geograph.org.uk/geophotos/04/58/13/4581325_757d0cff.jpg')"); }
  
  //Clear
  else if(res.weather[0].id==800){ $("body").css("background","url('https://c2.staticflickr.com/2/1298/1340979055_a669e8cc70_b.jpg')"); }
  
  //Clouds
   else if(res.weather[0].id>=801 && res.weather[0].id<=804){ $("body").css("background","url('http://www.freegreatpicture.com/Max-Pixel/static/photo/1x/Skyporn-Clouds-Skies-Weather-Lookup-Sky-Cloudy-1571791.jpg')"); }

  //Extreme
  else if(res.weather[0].id>=900){ $("body").css("background","url('https://upload.wikimedia.org/wikipedia/commons/1/1a/Dszpics1.jpg')"); }
  
  $("body").css("background-size","1400px 1000px");
  
  //---------Fill in text---------------
  $(".textOut").html("<h2><u>The Weather in "+res.name+"</u></h2>");
  $(".textOut").append("<h4>Current Temp: <span class='tempReadout'>"+res.main.temp+"</span><button class='temp'>F</button></h4>");
  $(".textOut").append("<h4 class='des'>"+res.weather[0].description+"</h4>");
  //------------Format new elements----------
  $(".des").css("textTransform","capitalize");
  $(".temp").click(toggleTemp);
   $(".temp").css("margin-left","5px");
   $(".temp").css("color","red");
   $(".temp").css("background","none");

  }