class Trips {
  constructor (tripsData) {
    this.trips = tripsData;
  }

  getPastTrips(userID) {
    return this.trips.filter(trip => trip.userID === userID);
  }
}

export default Trips;