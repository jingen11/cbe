const fs = require( 'fs' );
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

Worker.prototype.toAux = function()
{
    return(
        {
            name: this.name,
            icNo: this.icNo,
            wage: this.wage,
            dateJoined: this.dateJoined,
            vehicle: this.vehicle,
            id: this.id     
        }
    );
};
Worker.prototype.update = async function( newProps )
{
	const modifiedProps = {
        id: this.id,
        name: newProps.name ? newProps.name : this.name,
        icNo: newProps.icNo ? newProps.icNo : this.icNo,
        icImagePath: this.icImagePath,
        wage: newProps.wage ? newProps.wage : this.wage,
        dateJoined: newProps.dateJoined ? newProps.dateJoined : this.dateJoined,
        vehicleId: newProps.vehicle ? newProps.vehicle.id : this.vehicleId
    };

    if( newProps.icImage )
    {
        modifiedProps.icImagePath = `${modifiedProps.name}_ic_${Date.now()}.png`;
        const temp = modifiedProps.icImagePath.split(' ');
        modifiedProps.icImagePath = temp.join('_');
    }
    
	await Database.i.db.collection( "workers" ).updateOne( { "_id": Database.i.mongodb.ObjectId( this.id ) }, { $set : { ...modifiedProps } } );

    if( modifiedProps.icImagePath !== this.icImagePath )
    {
        try
        {
            fs.accessSync( `./images/workers/${this.icImagePath}` );
            fs.unlinkSync( `./images/workers/${this.icImagePath}` );
        }
        catch( error )
        {
            if( error.code !== "ENOENT" )
                throw error;
        }

        if( workerObj.icImage )
            fs.writeFileSync( `./images/workers/${modifiedProps.icImagePath}`, workerObj.icImage.buffer );
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

    if( workerObj.icImage )
    {
        workerObj.icImagePath = `${workerObj.name}_ic_${Date.now()}.png`;
        const temp = workerObj.icImagePath.split(' ');
        workerObj.icImagePath = temp.join('_');
    }

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

    if( workerObj.icImage )
        fs.writeFileSync( `./images/workers/${newWorkerObj.icImagePath}`, workerObj.icImage.buffer );

	const newWorker = new Worker( newWorkerObj );

	Worker.byId[newWorker.id] = newWorker;

    return newWorker;
};
Worker.delete = async function( worker )
{
	await Database.i.db.collection( "workers" ).deleteOne( { _id: Database.i.mongodb.ObjectId( worker.id ) } );

	delete Worker.byId[worker.id];

    try
    {
        fs.accessSync( `./images/workers/${worker.icImagePath}` );
        fs.unlinkSync( `./images/workers/${worker.icImagePath}` );
    }
    catch( error )
    {
        if( error.code !== "ENOENT" )
            throw error;
    }

    return true;
};

Worker.byId = {};
