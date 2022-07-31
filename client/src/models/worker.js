

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
      this.vehicle = aux.vehicleId;
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
};

Worker.prototype.update = async function (newProps) {
  // const modifiedProps = {
  //   id: this.id,
  //   name: newProps.name ? newProps.name : this.name,
  //   phoneNumber: newProps.phoneNumber ? newProps.phoneNumber : this.phoneNumber,
  //   icNo: newProps.icNo ? newProps.icNo : this.icNo,
  //   icImagePath: this.icImagePath,
  //   wage: newProps.wage ? newProps.wage : this.wage,
  //   dateJoined: newProps.dateJoined ? newProps.dateJoined : this.dateJoined,
  //   vehicleId: newProps.vehicle ? newProps.vehicle.id : this.vehicleId
  // };

  // if (newProps.icImage) {
  //   modifiedProps.icImagePath = `${modifiedProps.name}_ic_${Date.now()}.png`;
  //   const temp = modifiedProps.icImagePath.split(' ');
  //   modifiedProps.icImagePath = temp.join('_');
  // }

  // await Database.i.db.collection("workers").updateOne({ "_id": Database.i.mongodb.ObjectId(this.id) }, { $set: { ...modifiedProps } });

  // if (modifiedProps.icImagePath !== this.icImagePath) {
  //   try {
  //     fs.accessSync(`./images/workers/${this.icImagePath}`);
  //     fs.unlinkSync(`./images/workers/${this.icImagePath}`);
  //   }
  //   catch (error) {
  //     if (error.code !== "ENOENT")
  //       throw error;
  //   }

  //   if (workerObj.icImage)
  //     fs.writeFileSync(`./images/workers/${modifiedProps.icImagePath}`, workerObj.icImage.buffer);
  // }

  // this.name = modifiedProps.name;
  // this.phoneNumber = modifiedProps.phoneNumber;
  // this.icNo = modifiedProps.icNo;
  // this.icImagePath = modifiedProps.icImagePath;
  // this.wage = modifiedProps.wage;
  // this.dateJoined = modifiedProps.dateJoined;
  // this.vehicle = Vehicle.byId[modifiedProps.vehicleId];
};

Worker.delete = async function (worker) {
  // await Database.i.db.collection("workers").deleteOne({ _id: Database.i.mongodb.ObjectId(worker.id) });

  // delete Worker.byId[worker.id];

  // try {
  //   fs.accessSync(`./images/workers/${worker.icImagePath}`);
  //   fs.unlinkSync(`./images/workers/${worker.icImagePath}`);
  // }
  // catch (error) {
  //   if (error.code !== "ENOENT")
  //     throw error;
  // }

  return true;
};

