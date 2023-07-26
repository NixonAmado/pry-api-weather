let searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click',buscador)



async function apiData(ciudad="madrid"){
    try{
        //269e8281da209a979a17de078716d0e6
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=269e8281da209a979a17de078716d0e6`);
        const data = await response.json();
        return data;
    }
    catch(error){
        throw("Ha ocurrido un error " + error);
        
    }
}

buscador();

async function buscador(){
    let iptForm1 = document.getElementById('form1-ipt').value || "madrid";
    try{
        mostrarData(await apiData(iptForm1));
    }catch(error){
        console.error("ciudad no encontrada")
    }
}


async function mostrarData(objeto){
    try{
        let cardWeatherContainer = document.getElementById('card-weather-container');
        let response = await fetch(`https://openweathermap.org/img/wn/${objeto.weather[0].icon}@2x.png`);
        let iconUrl = response.url;
        cardWeatherContainer.innerHTML= 
        `
            <div class="row card mb-3 card-bg" style="max-width: 510px; width: 90vw;">
            <div class="card-header border-0">
            <h2 class="card-title m-0 d-flex justify-content-between">${objeto.name}<span>${objeto.sys.country}</span></h2>
            <h5 class="d-flex w-100 justify-content-between">lat: ${objeto.coord.lat}<span> lon: ${objeto.coord.lon}</span></h5>
            </div>
            <div class="card-body p-0 d-flex">
            <a class="ripple d-flex w-100" href="#!">
            <img alt="example" class="img-fluid rounded filtros-img" src="${iconUrl}"/>
            </a>
            
            <div class="card-pills w-100 mx-4 d-flex flex-column">  
                <p class="fw-light d-flex justify-content-between">Maxima<span class="fs-1 ">${(objeto.main.temp_max - 273).toFixed(2)}º</span></p>
                <p class="fw-light d-flex justify-content-between">Minima<span class="fs-2 ">${(objeto.main.temp_min - 273).toFixed(2)}º</span></p>
                <p class="fw-light d-flex justify-content-between">Humedad<span class="fs-3 ">${objeto.main.humidity
                }%</span></p>
                
             </div>
            </div>
            </div>
            `
            }
    catch (err) {
        console.error("No se ha podido obtener el icono",err);
            }
        }      