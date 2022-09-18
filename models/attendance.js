module.exports = class Attendance {
  id;
  worker;
  vehicle;
  date;

  constructor(aux) {
    if (aux) {
      this.id = aux._id.toString();
      this.worker = Model.Worker.byId[aux.workerId];
      this.vehicle = aux.vehicleId ? Model.Vehicle.byId[aux.vehicleId] : null;
      this.date = aux.date;
    }
  }

  toAux() {
    return {
      id: this.id,
      workerId: this.worker.id,
      vehicleId: this.vehicle.id,
      date: this.date
    };
  }

  async update(attendanceDetails) {
    const modifiedProps = {
      id: this.id,
      workerId: attendanceDetails.workerId ? attendanceDetails.workerId : this.worker.id,
      vehicleId: attendanceDetails.vehicleId ? attendanceDetails.vehicleId : this.vehicle !== null ? this.vehicle.id : null
    };

    await Database.i.db.collection("attendances").updateOne({ "_id": Database.i.mongodb.ObjectId(this.id) }, { $set: { ...modifiedProps } });

    this.worker = Model.Worker.byId[modifiedProps.workerId];
    this.vehicle = modifiedProps.vehicleId !== null ? Model.Vehicle.byId[modifiedProps.vehicleId] : null;
  }

  static async delete(workerId, date) {
    if (!(date instanceof Date))
      throw new Error('date must be an instance of Date');

    await Database.i.db.collection("attendances").deleteOne({ date: date, workerId: workerId });
  }

  static async addAttendance(attendanceDetails) {
    if (!(attendanceDetails.date instanceof Date))
      throw new Error('date must be provided');

    if (!attendanceDetails.worker instanceof Model.Worker)
      throw new Error('worker must be instance of Model.Worker');

    const newDetails = {
      workerId: attendanceDetails.worker.id,
      date: attendanceDetails.date,
      vehicleId: attendanceDetails.vehicle.id
    }

    try {
      const result = await Database.i.db.collection("attendances").insertOne(newDetails);
      newDetails._id = result.insertedId;

      const newAttendance = new Attendance(newDetails);

      return newAttendance;
    } catch (error) {
      if (error.code !== 11000)
        throw error;

      else {
        return (await Attendance.getAttendance(newDetails.date, newDetails.date, [newDetails.workerId]))[0];
      }
    }
  }

  static async getAttendance(from, to, workerIds) {
    let attendances = [];
    if (!(from instanceof Date) || !(to instanceof Date)) {
      throw new Error('from and to must be instance of Date');
    }

    if (!(workerIds instanceof Array)) {
      throw new Error('workerIds must be instance of Array');
    }

    await Database.i.db.collection("attendances").find({ date: { $lte: new Date(to), $gte: new Date(from) }, workerId: { $in: workerIds } })
      .sort({ date: -1 }).forEach((attendance) => { attendances.push(new Attendance(attendance)) });

    return attendances;
  }
}