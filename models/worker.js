const Worker = (module.exports = function (aux) {
  this.id = aux.id;
  this.name = aux.name;
  this.icNo = aux.icNo;
  this.icImagePath = aux.icImagePath;
  this.wage = aux.wage;
  this.dateJoined = aux.dateJoined;
  this.vehicle = aux.vehicle;
});

Worker.prototype.update = function () {};

Worker.prototype.delete = function () {};

Worker.newWorker = function (workerObj) {};
