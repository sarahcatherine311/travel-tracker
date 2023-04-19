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
});