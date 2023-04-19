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
});