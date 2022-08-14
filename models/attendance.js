class Attendance {
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

  async delete(attendanceId) {
    await Database.i.db.collection("attendances").deleteOne({ _id: Database.i.mongodb.ObjectId(attendanceId) });
  }

  static async addAttendance(attendanceDetails) {
    if (!attendanceDetails.date)
      throw new Error('date must be provided');

    if (attendanceDetails.worker instanceof Model.Worker)
      throw new Error('worker must be instance of Model.Worker');

    const newDetails = {
      workerId: attendanceDetails.workerId,
      date: attendanceDetails.date,
      vehicleId: attendanceDetails.vehicleId
    }

    const result = await Database.i.db.collection("attendances").insertOne(newDetails);
    newDetails._id = result.insertedId;

    const newAttendance = new Attendance(newDetails);

    return newAttendance;
  }

  static async getAttendance(from, to, workerIds) {
    const attendances = [];
    if (!(from instanceof Date) || !(to instanceof Date)) {
      throw new Error('from and to must be instance of Date');
    }

    if (!(workerIds instanceof Array)) {
      throw new Error('workerIds must be instance of Array');
    }

    await Database.i.db.collection("attendances").find({ date: { $lte: from, $gte: to }, workerId: { $in: workerIds } })
      .sort({ date: -1 }).forEach((attendance) => { attendances.push(new Attendance(attendance)) });

    return attendances;
  }
}