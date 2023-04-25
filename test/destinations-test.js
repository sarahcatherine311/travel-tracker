import chai from 'chai';
const expect = chai.expect;
import destinationsTestData from './destinations-test-data';
import Destinations from '../src/Destinations';

describe('Destinations', function() {
  let destinations;

  beforeEach(() => {
    destinations = new Destinations(destinationsTestData);
  });

  it('should be a function', function() {
    expect(Destinations).to.be.a('function');
  });

  it('should be an instance of destinations', function() {
    expect(destinations).to.be.an.instanceof(Destinations);
  });
  
  it('should take in a destinations id', function() {
    expect(destinations.destinations[0].id).to.equal(1);
  });

  it('should take in a destinations location', function() {
    expect(destinations.destinations[0].destination).to.equal("Lima, Peru");
  });

  it('should take in the estimated lodging cost per day', function() {
    expect(destinations.destinations[0].estimatedLodgingCostPerDay).to.equal(70);
  });

  it('should take in the estimated flight cost per person', function() {
    expect(destinations.destinations[0].estimatedFlightCostPerPerson).to.equal(400);
  });

  it('should take in a destination image', function() {
    expect(destinations.destinations[0].image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it('should take in a destination image alt text', function() {
    expect(destinations.destinations[0].alt).to.equal("overview of city buildings with a clear sky");
  });

  it('should be able to return a destinations info from an id', function() {
    expect(destinations.getDestinationInfo(1)).to.deep.equal({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky"
      });
  });

  it('should be able to calculate the total cost of the destination based on the destination id, number of travelers, and duration of the trip', function() {
    expect(destinations.getCostOfDestination(1, 2, 10)).to.equal(1650);
  });
});