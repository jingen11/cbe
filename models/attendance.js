class Attendance {
  id;
  user;
  vehicle;
  date;

  constructor(aux) {
    if (aux) {
      this.id = aux._id.toString();
      this.user = aux.user;
      this.vehicle = aux.vehicle;
      this.date = aux.date;
    }
  }

  async update(attendanceDetails) { }

  async delete(attendanceId) {
    await Database.i.db.collection("attendances").deleteOne({ _id: Database.i.mongodb.ObjectId(attendanceId) });
  }

  static async addAttendance(attendanceDetails) {
    if (!attendanceDetails.date)
      throw new Error('date must be provided');

    if (attendanceDetails.user instanceof Model.Worker)
      throw new Error('user must be instance of Model.Worker');

    const newDetails = {
      user: attendanceDetails.user.id,
      date: attendanceDetails.date,
      vehicle: attendanceDetails.vehicle ? attendanceDetails.vehicle.id : 0
    }

    const result = await Database.i.db.collection("attendances").insertOne(newDetails);
    newDetails._id = result.insertedId;

    const newAttendance = new Attendance(newDetails);

    return newAttendance;
  }

  static async getAttendance(from, to, users) {

  }

}