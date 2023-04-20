import chai from 'chai';
const expect = chai.expect;
import tripsTestData from './trips-test-data';
import Trips from '../src/Trips';

describe('Trips', function() {
  let trips;

  beforeEach(() => {
    trips = new Trips(tripsTestData);
  });

  it('should be a function', function() {
    expect(Trips).to.be.a('function');
  });

  it('should be an instance of trips', function() {
    expect(trips).to.be.an.instanceof(Trips);
  });
  
  it('should take in a trips id', function() {
    expect(trips.trips[0].id).to.equal(46);
  });

  it('should take in a trips user ID', function() {
    expect(trips.trips[0].userID).to.equal(44);
  });

  it('should take in the destinationID', function() {
    expect(trips.trips[0].destinationID).to.equal(33);
  });

  it('should take in the number of travelers', function() {
    expect(trips.trips[0].travelers).to.equal(2);
  });

  it('should take in the date', function() {
    expect(trips.trips[0].date).to.equal("2020/08/24");
  });

  it('should take in the trip duration', function() {
    expect(trips.trips[0].duration).to.equal(11);
  });

  it('should take in the trip status', function() {
    expect(trips.trips[0].status).to.equal("approved");
  });

  it('should take in the trips suggested activities', function() {
    expect(trips.trips[0].suggestedActivities).to.deep.equal([]);
  });

  it('should return the past trips for a given user', function() {
    expect(trips.getPastTrips(44)).to.deep.equal([
      {
      "id": 46,
      "userID": 44,
      "destinationID": 33,
      "travelers": 2,
      "date": "2020/08/24",
      "duration": 11,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 48,
      "userID": 44,
      "destinationID": 14,
      "travelers": 6,
      "date": "2021/02/10",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": []
      },
      {
      "id": 68,
      "userID": 44,
      "destinationID": 41,
      "travelers": 6,
      "date": "2020/09/19",
      "duration": 14,
      "status": "approved",
      "suggestedActivities": []
      }]);
  });
});

