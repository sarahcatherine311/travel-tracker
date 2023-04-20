import './css/styles.css';
import { dataFetch } from './apiCalls.js';
import Travelers from './Travelers';
import Trips from './Trips';
import Destinations from './Destinations';

let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
let travelers, trips, destinations;

window.addEventListener('load', function () {
  Promise.all([dataFetch('travelers'), dataFetch('trips'), dataFetch('destinations')])
  .then(data => {
    travelers = new Travelers (data[0].travelers);
    trips = new Trips(data[1].trips);
    destinations = new Destinations(data[2].destinations);
    updateDOM()
  });
});

function updateDOM() {
  console.log(travelers)
  console.log(trips)
  console.log(destinations)
}

