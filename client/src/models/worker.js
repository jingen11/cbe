import Vehicle from './vehicle';
export default class Worker {
  id;
  name;
  phoneNumber;
  icNo;
  icImagePath;
  wage;
  dateJoined;
  vehicle;

  constructor(aux) {
    if (aux) {
      this.id = aux.id;
      this.name = aux.name;
      this.phoneNumber = aux.phoneNumber;
      this.icNo = aux.icNo;
      this.icImagePath = aux.icImagePath ? aux.icImagePath : null;
      this.wage = aux.wage ? aux.wage : null;
      this.dateJoined = aux.dateJoined;
      this.vehicle = aux.vehicle ? new Vehicle(aux.vehicle) : null;
    }
  }

  toAux() {
    return (
      {
        name: this.name,
        phoneNumber: this.phoneNumber,
        icNo: this.icNo,
        wage: this.wage,
        icImagePath: this.icImagePath,
        dateJoined: this.dateJoined,
        vehicle: this.vehicle ? this.vehicle.toAux() : null,
        id: this.id
      });
  }

  update(newProps) {
    const modifiedProps = {
      id: this.id,
      name: newProps.name ? newProps.name : this.name,
      phoneNumber: newProps.phoneNumber ? newProps.phoneNumber : this.phoneNumber,
      icNo: newProps.icNo ? newProps.icNo : this.icNo,
      icImagePath: newProps.icImagePath ? newProps.icImagePath : this.icImagePath,
      wage: newProps.wage ? newProps.wage : this.wage,
      dateJoined: newProps.dateJoined ? newProps.dateJoined : this.dateJoined,
      vehicle: newProps.vehicle ? new Vehicle(newProps.vehicle) : this.vehicle
    };

    this.name = modifiedProps.name;
    this.phoneNumber = modifiedProps.phoneNumber;
    this.icNo = modifiedProps.icNo;
    this.icImagePath = modifiedProps.icImagePath;
    this.wage = modifiedProps.wage;
    this.dateJoined = modifiedProps.dateJoined;
    this.vehicle = modifiedProps.vehicle;
  }
};

