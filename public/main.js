//Cory Rahman helped me navigate functionalities between client and server

document.querySelector('#postmessage').addEventListener('click',postmessage)
document.querySelector('#showPos').addEventListener('click',showPos)
const display = document.querySelector('#current-location')
const list = document.querySelector('#relevant-messages')
let locations = []

//check the database for messages in locations
setInterval(getmessages,1000*60*60)

//shows message on load
function getmessages() {
    while(list.childElementCount > 0){
        list.childNodes.forEach(elem=>elem.remove())
    }
    
    navigator.geolocation.getCurrentPosition((pos) => {
        const crds = pos.coords
        fetch('/getmessages')
            .then(res=>res.json())
            .then(data=> {
                console.log(data)
                data.forEach(elem=>{
                    // console.log(elem.location)
                    const distance = haversineDistance(elem.location.lat,elem.location.long,crds.latitude,crds.longitude)
                    if (distance < 1) {
                        console.log(elem.message)
                        const message = document.createElement('li')
                        message.textContent = elem.message
                        list.appendChild(message)
                    }
                })
            })
        }
    )
}

//posts a new message to db, then reloads page
function postmessage(){
    const message = document.querySelector('#message').value
    if (message === ''){
        return
    }
    navigator.geolocation.getCurrentPosition((pos) => {
    // console.log(pos)
    const crds = pos.coords
    fetch('/postmessage',{
            method:"post",
            body: JSON.stringify({
                message:message,
                location:{
                    lat:crds.latitude,
                    long:crds.longitude
                },            
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(data=> {
            getmessages()
        })
        // .then(res => console.log(res))
        // document.querySelector('#lat').innerText = `Latitude: ${crds.latitude}`
        // document.querySelector('#long').innerText = `Longitude: ${crds.longitude}`
    })
}

//finds messages in relevant distance
//===========Cory Rahman helped me find this formula; from Sumit Sakpal: https://medium.com/@sumitsakpal02/how-to-calculate-distance-between-two-coordinates-in-javascript-using-haversine-formula-c2dc0f5d524c
function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (angle) => (angle * Math.PI) / 180;
    
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function showPos(){
    navigator.geolocation.getCurrentPosition((pos) => {
        display.innerText = `Your current position id ${pos.coords.latitude}, ${pos.coords.longitude}`
    })
    getmessages()
} 

getmessages()



//=================constantly watches position(come back to later since it clogs up processes)========================//
// function watchPos(){
//     navigator.geolocation.watchPosition((pos) => {
//         //get locations from database
//         //compare it to watcher

//         console.log('Fired!',JSON.stringify(pos))
//         const crds = pos.coords        
//     }, (error) => console.log(error)
//     )
// }
// document.querySelector('#watchPos').addEventListener('click',watchPos)