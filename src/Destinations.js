class Destinations {
  constructor (destinationsData) {
    this.destinations = destinationsData;
  };

  getDestinationInfo(destinationID) {
    return this.destinations.find(destination => destination.id === destinationID);
  };

  getCostOfDestination(destinationID, numTravelers, duration) {
    const destination = this.getDestinationInfo(destinationID);
    const lodgingCost = destination.estimatedLodgingCostPerDay * duration;
    const flightCost = destination.estimatedFlightCostPerPerson * numTravelers;
    const agentFee = (lodgingCost + flightCost) * 0.1;

    return lodgingCost + flightCost + agentFee;
  };
};

export default Destinations;