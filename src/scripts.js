import './css/styles.css';
import { dataFetch } from './apiCalls.js';
import Travelers from './Travelers';
import Trips from './Trips';
import Destinations from './Destinations';

const pastTripsList = document.querySelector('#pastTripsList');
const totalSpent = document.querySelector('#totalSpent');
const headerWelcome = document.querySelector('#headerWelcome');
const calendar = document.querySelector('#calendar');

let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
let travelers, trips, destinations, newUser;

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
  displayCalendar();
  generateRandomUser();
  showPastTrips();
  showTotalSpent();
  displayWelcomeMessage();
}

function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
};

function generateRandomUser() {
  newUser = travelers.getTravelerInfo(Math.floor(Math.random() * travelers.travelers.length));
};

function displayWelcomeMessage() {
  headerWelcome.innerText = `Welcome, ${newUser.name}`
};

function showPastTrips() {
  const pastTrips = trips.getPastTrips(newUser.id);
  pastTrips.forEach(trip => {
    const destinationInfo = destinations.getDestinationInfo(trip.destinationID);
    pastTripsList.innerHTML += `
    <li style="font-size: 1.5em">${trip.date}: ${destinationInfo.destination}</li>
    <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/>
    `;
  });
};

function showTotalSpent() {
  const pastTrips = trips.getPastTrips(newUser.id);
  const totalCost = Math.round(pastTrips.reduce((acc, trip) => {
    acc += destinations.getCostOfDestination(trip.destinationID, trip.travelers, trip.duration);
    return acc;
  }, 0));
  let dollarUSLocale = Intl.NumberFormat('en-US');
  let totalPrice = dollarUSLocale.format(totalCost)
  totalSpent.innerText = `Total amount spent on trips: $${totalPrice}`;
};