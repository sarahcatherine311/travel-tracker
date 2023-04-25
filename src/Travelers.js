import Trips from "./Trips";

class Travelers {
  constructor (travelersData) {
    this.travelers = travelersData;
  };

  getTravelerInfo(userID) {
    return this.travelers.find(traveler => traveler.id === userID);
  };
;}


export default Travelers;
