import './css/styles.css';
import { dataFetch } from './apiCalls.js';
import Travelers from './Travelers';
import Trips from './Trips';
import Destinations from './Destinations';

const pastTripsList = document.querySelector('#pastTripsList');
const upcomingTripsList = document.querySelector('#upcomingTripsList')
const totalSpent = document.querySelector('#totalSpent');
const headerWelcome = document.querySelector('#headerWelcome');
const calendar = document.querySelector('#calendar');
const form = document.querySelector('#form');
const estimatedCost = document.querySelector('#estimatedCost');
const numTravelersInput = document.querySelector('#numTravelersInput');
const durationInput = document.querySelector('#durationInput');
const destinationDropdown = document.querySelector('#destinationDropdown');

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
  showUpcomingTrips();
  showTotalSpent();
  displayWelcomeMessage();
  displayDestinationsList();
  displayEstimatedPrice();
}

function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" min="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
};

function generateRandomUser() {
  newUser = travelers.getTravelerInfo(Math.floor(Math.random() * travelers.travelers.length));
};

function displayWelcomeMessage() {
  headerWelcome.innerText = `Welcome, ${newUser.name}`
};

function displayDestinationsList() {
  destinations.destinations.forEach(destination => {
    destinationDropdown.innerHTML += `
    <option value="${destination.id}">${destination.destination}</option>
    `
  });
};

function showPastTrips() {
  let pastTrips = trips.getPastTrips(newUser.id);
  pastTrips.forEach(trip => {
    const destinationInfo = destinations.getDestinationInfo(trip.destinationID);
    pastTripsList.innerHTML += `
    <li style="font-size: 1.5em">${trip.date}: ${destinationInfo.destination}</li>
    <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/>
    `;
  });
};

function showUpcomingTrips() {
  let upcomingTrips = trips.getUpcomingTrips(newUser.id);
  upcomingTrips.forEach(trip => {
    const destinationInfo = destinations.getDestinationInfo(trip.destinationID);
    upcomingTripsList.innerHTML += `
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
  let totalPrice = dollarUSLocale.format(totalCost);
  totalSpent.innerText = `Total amount spent on trips: $${totalPrice}`;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(calendar.firstChild.value.split('-').join('/'))
  
  const data = {
    "id": parseInt(trips.trips.length + 1),
    "userID": newUser.id,
    "destinationID": parseInt(destinationDropdown.value),
    "travelers": parseInt(numTravelersInput.value),
    "date": calendar.firstChild.value.split('-').join('/'),
    "duration": durationInput.value,
    "status": "pending",
    "suggestedActivities": []
  };

  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(json => console.log(json))
  .catch(err => console.log(`Error at: ${err}`));

  upcomingTripsList.innerHTML = '';
  showUpcomingTrips();
  event.target.reset();
});

function  displayEstimatedPrice() {
  if (destinationDropdown.value && numTravelersInput.value && calendar.value && durationInput.value) {
    const totalCost = destinations.getCostOfDestination(destinationDropdown.value, numTravelersInput.value, durationInput.value);
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let totalPrice = dollarUSLocale.format(totalCost);
    estimatedCost.innerText = `The estimated cost of this trip is ${totalPrice}!`;
  };
};