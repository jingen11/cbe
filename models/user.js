const bcrypt = require('bcryptjs');

const User = module.exports = function( aux )
{
    this.id = aux._id.toString(); // mongodb ObjectId to string
    this.username = aux.username;
    this.password = aux.password;
    this.salt = aux.salt;
    this.role = aux.role; // admin can delete and activate user
    this.activated = aux.activated; // flag to check unauthorized user
};

User.prototype.toAux = function()
{
    return {
        id: this.id,
        username: this.username,
        password: this.password,
        role: this.role,
        activated: this.activated
    };
};
User.prototype.changePassword = async function( newPassword, confirmPassword )
{	
    if( newPassword !== confirmPassword )
        throw new Error( "Password and confirm password do not match" );

	const salt = bcrypt.genSaltSync( 10 );
	const password = bcrypt.hashSync( newPassword,salt );

	await Database.i.db.collection( "users" ).updateOne( { username: user.username }, { $set : { password: password, salt: salt } } );
};
User.prototype.activateUsers = async function( users )
{
    if( this.role !== User.Role.ADMIN )
        throw new Error( 'Only admin can activate users' );
        
    for( const user of users )
    {
        try
        {
            await Database.i.db.collection( "users" ).updateOne( { username: user.username }, { $set : { activated: true } } );
        }
        catch( error )
        {
            console.log( error );
            continue;  
        }
    }
};
User.prototype.deleteUser = async function( deleteUser )
{
    if( this.role !== User.Role.ADMIN )
        throw new Error( 'Only admin can delete users' );

    if( deleteUser === this )
        throw new Error( 'self cannot be deleted' );

    await Database.i.db.collection( "users" ).deleteOne( { username: deleteUser.username } );

    return true;
};

User.getUsers = async function( pagination = 10, page = 1 )
{
	const users = [];
	await Database.i.db.collection( "users" ).find().sort( { _id: 1 } ).skip( page > 1 ? page - 1 * pagination : 0 )
	.limit( pagination ).forEach( ( user ) =>
	{
		users.push( new User( user ) );
	});

	return users;
};
User.login = async function( username, password )
{
    if( ( !username && !password ) || !username || !password )
        throw new Error( 'No username or password' );

    const userObj = await Database.i.db.collection( "users" ).findOne( { username: username } );

    if( !userObj )
        throw new Error( 'Username or password is incorrect' );

    const match = bcrypt.compareSync( password, userObj.password );

    if( match )
    {
      if( userObj.activated )
          return new User( userObj );

      else
          throw new Error( 'The account is not activated' );
    }
    
    else
      throw new Error( 'Username or password is incorrect' );
};
User.signUp = async function( username, password, confirmPassword )
{
    if( !username )
        throw new Error( 'No username' );

    if( !password )
        throw new Error( 'No password' );

    if( password !== confirmPassword )
        throw new Error( "Password and confirm password do not match" );

    const aux = {
        username: username,
        password: password,
        role: User.Role.NORMAL_USER,
        activated: false
    };

    const salt = bcrypt.genSaltSync( 10 );

    aux.salt = salt;
    aux.password = bcrypt.hashSync( aux.password, aux.salt );

    try
    {
        const result = await Database.i.db.collection( "users" ).insertOne( aux );
        aux._id = result.insertedId;

        return new User( aux );
    }
    catch( error )
    {
        if( error.code === 11000 )
          throw new Error( 'Username already existed' ); 
        
        else 
          rethrow;
    }
};

User.Role = { NORMAL_USER: 0, ADMIN: 1 };
User.byId = {};
