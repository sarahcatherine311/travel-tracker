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
});
