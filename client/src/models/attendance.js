export default class Attendance {
  id;
  worker;
  vehicle;
  date;

  constructor(aux) {
    if (aux) {
      this.id = aux.id;
      this.worker = aux.worker;
      this.vehicle = aux.vehicle;
      this.date = new Date(aux.date);
    }
  }

  toAux() {
    return {
      id: this.id,
      worker: this.worker.id,
      vehicle: this.vehicle.id,
      date: this.date
    };
  }
};
