import chai from 'chai';
const expect = chai.expect;
import travelersTestData from './travelers-test-data';
import Travelers from '../src/Travelers';

describe('Travelers', function() {
  let travelers;

  beforeEach(() => {
    travelers = new Travelers(travelersTestData);
  });

  it('should be a function', function() {
    expect(Travelers).to.be.a('function');
  });

  it('should be an instance of travelers', function() {
    expect(travelers).to.be.an.instanceof(Travelers);
  });
  
  it('should take in a travelers id', function() {
    expect(travelers.travelers[0].id).to.equal(1);
  });

  it('should take in a travelers name', function() {
    expect(travelers.travelers[0].name).to.equal("Ham Leadbeater");
  });

  it('should take in a travelers type', function() {
    expect(travelers.travelers[0].travelerType).to.equal("relaxer");
  });

  it('should be able to return a travelers info based on their user ID', function() {
    expect(travelers.getTravelerInfo(1)).to.deep.equal({"id": 1, "name": "Ham Leadbeater", "travelerType": "relaxer"});
  });
});
