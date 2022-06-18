const Vehicle = require( './vehicle' );
const Worker = module.exports = function( aux )
{
    this.id = aux._id.toString();
    this.name = aux.name;
    this.icNo = aux.icNo;
    this.icImagePath = aux.icImagePath ? aux.icImagePath: null;
    this.wage = aux.wage ? aux.wage: null;
    this.dateJoined = aux.dateJoined;
    this.vehicle = aux.vehicleId ? Vehicle.byId[aux.vehicleId] : null;
};

Worker.prototype.update = async function( newProps )
{
	const modifiedProps = {
        id: this.id,
        name: newProps.name ? newProps.name : this.name,
        icNo: newProps.icNo ? newProps.icNo : this.icNo,
        icImagePath: newProps.icImagePath ? newProps.icImagePath : this.icImagePath,
        wage: newProps.wage ? newProps.wage : this.wage,
        dateJoined: newProps.dateJoined ? newProps.dateJoined : this.dateJoined,
        vehicleId: newProps.vehicle ? newProps.vehicle.id : this.vehicleId
    };
    
	await Database.i.db.collection( "workers" ).updateOne( { "_id": Database.i.mongodb.ObjectId( this.id ) }, { $set : { ...modifiedProps } } );

    if( modifiedProps.icImagePath !== this.icImagePath )
    {
        // delete the file
    }

    this.name = modifiedProps.name;
    this.icNo = modifiedProps.icNo;
    this.icImagePath = modifiedProps.icImagePath;
    this.wage = modifiedProps.wage;
    this.dateJoined = modifiedProps.dateJoined;
    this.vehicle = Vehicle.byId[modifiedProps.vehicleId];
};

Worker.initialise = async function()
{
	await Database.i.db.collection( "workers" ).find().forEach( ( worker ) =>
	{
		Worker.byId[ worker._id ] = new Worker( worker );
	});
};
Worker.newWorker = async function( workerObj )
{
    if( !workerObj.name )
        throw new Error( 'name cannot be empty' );

    if( !workerObj.icNo )
        throw new Error( 'ic number cannot be empty' );

    if( workerObj.dateJoined && !( workerObj.dateJoined instanceof Date ) )
        throw new Error( 'dateJoined must be an instance of Date class' );

    if( !workerObj.dateJoined )
        workerObj.dateJoined = Date.now();
    else
        workerObj.dateJoined = workerObj.dateJoined.getTime();

    const newWorkerObj = {
        name: workerObj.name,
        icNo: workerObj.icNo,
        icImagePath: workerObj.icImagePath ? workerObj.icImagePath: null,
        wage: workerObj.wage ? workerObj.wage: null,
        dateJoined: workerObj.dateJoined,
        vehicleId: workerObj.vehicle ? workerObj.vehicle.id : null
    };

    const result = await Database.i.db.collection( "workers" ).insertOne( newWorkerObj );
    newWorkerObj._id = result.insertedId;

	const newWorker = new Worker( newWorkerObj );

	Worker.byId[newWorker.id] = newWorker;

    return newWorker;
};
Worker.delete = async function( worker )
{
	await Database.i.db.collection( "workers" ).deleteOne( { _id: ObjectId( worker.id ) } );

	delete Worker.byId[worker.id];

    // delete image files

    return true;
};

Worker.byId = {};
