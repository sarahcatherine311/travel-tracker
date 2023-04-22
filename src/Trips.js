class Trips {
  constructor (tripsData) {
    this.trips = tripsData;
  }

  getPastTrips(userID) {
    return this.trips.filter(trip => trip.userID === userID && trip.status === 'approved');
  }

  getUpcomingTrips(userID) {
    return this.trips.filter(trip => trip.userID === userID && trip.status === 'pending');
  }
}

export default Trips;