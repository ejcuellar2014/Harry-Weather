window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-Description');
    let temperatureDegree = document.querySelector(".temperature-Degree");
    let locationTimezone = document.querySelector(".location-Timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position=> {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/8aae2fccb2517700e4a774488dc246c9/${lat},${long}`;


            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
            
                const {temperature,summary,icon} = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));

                //Change Temperature to Celcius/Farenheit
                    temperatureSection.addEventListener('click',()  => { 
                        if (temperatureSpan.textContent==="F") {
                            temperatureSpan.textContent = "C";

                        } else {
                          temperatureSpan.textContent = "F";
                        }
                    });   
                }); 
        });
    }
    function setIcons(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);
    }
});