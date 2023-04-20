class Destinations {
  constructor (destinationsData) {
    this.destinations = destinationsData;
  }

  getCostOfDestination(destinationID, numTravelers, duration) {
    const destination = this.destinations.find(destination => destination.id === destinationID);
    const lodgingCost = destination.estimatedLodgingCostPerDay * duration;
    const flightCost = destination.estimatedFlightCostPerPerson * numTravelers;
    const agentFee = (lodgingCost + flightCost) * 0.1

    return lodgingCost + flightCost + agentFee
  }
}

export default Destinations;