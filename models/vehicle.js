const Vehicle = module.exports = function( aux )
{
    this.id = aux._id.toString();
    this.registrationNum = aux.registrationNum;
    this.roadTaxExpDate = aux.roadTaxExpDate ? aux.roadTaxExpDate : null;
    this.puspakomExpDate = aux.puspakomExpDate ? aux.puspakomExpDate : null;
    this.petrolCardNum = aux.petrolCardNum ? aux.petrolCardNum : null;
    this.touchNGoCardNum = aux.touchNGoCardNum ? aux.touchNGoCardNum : null;
    this.active = aux.active ? aux.active : false;
};

Vehicle.prototype.update = function( newProps )
{
    const modifiedProps = {
        id: this.id,
        registrationNum: newProps.registrationNum ? newProps.registrationNum : this.registrationNum, 
        roadTaxExpDate: newProps.roadTaxExpDate ? newProps.roadTaxExpDate : this.roadTaxExpDate,
        puspakomExpDate: newProps.puspakomExpDate ? newProps.puspakomExpDate : this.puspakomExpDate,
        petrolCardNum: newProps.petrolCardNum ? newProps.petrolCardNum : this.petrolCardNum,
        touchNGoCardNum: newProps.touchNGoCardNum ? newProps.touchNGoCardNum : this.touchNGoCardNum,
        active: newProps.active !== null ? newProps : this.active
    };

    await Database.i.db.collection( "vehicles" ).updateOne( { "_id": Database.i.mongodb.ObjectId( this.id ) }, { $set : { ...modifiedProps } } );

    this.registrationNum = modifiedProps.registrationNum;
    this.roadTaxExpDate = modifiedProps.roadTaxExpDate;
    this.puspakomExpDate = modifiedProps.puspakomExpDate;
    this.petrolCardNum = modifiedProps.petrolCardNum;
    this.touchNGoCardNum = modifiedProps.touchNGoCardNum;
    this.active = modifiedProps.active;
};

Vehicle.initialise = async function()
{
	await Database.i.db.collection( "vehicles" ).find().forEach( ( vehicle ) =>
	{
		Vehicle.byId[ vehicle._id ] = new Vehicle( vehicle );
	});
};
Vehicle.newVehicle = async function( vehicleObj )
{
    if( !vehicleObj.registrationNum )
        throw new Error( 'plat number cannot be empty' );

    const newVehicleObj = {
        registrationNum: vehicleObj.registrationNum,
        roadTaxExpDate: vehicleObj.roadTaxExpDate ? vehicleObj.roadTaxExpDate : null,
        puspakomExpDate: vehicleObj.puspakomExpDate ? vehicleObj.puspakomExpDate : null,
        petrolCardNum: vehicleObj.petrolCardNum ? vehicleObj.petrolCardNum : null,
        touchNGoCardNum: vehicleObj.touchNGoCardNum ? vehicleObj.touchNGoCardNum : null,
        active: true
    };

    const result = await Database.i.db.collection( "vehicles" ).insertOne( newVehicleObj );
    newVehicleObj._id = result.insertedId;

	const newVehicle = new Vehicle( newVehicleObj );

	Vehicle.byId[newVehicle.id] = newVehicle;

    return newVehicle;
};

Vehicle.byId = {};