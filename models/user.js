const Db = require('../db');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('bson');

const User = module.exports = function( aux )
{
    this.id = aux._id.toString();
    this.username = aux.username;
    this.password = aux.password;
    this.salt = aux.salt;
    this.role = aux.role;
    this.activated = aux.activated;
};

User.prototype.activateUsers = async function( users )
{
    if( this.role !== User.Role.ADMIN )
        throw new Error( 'Only admin can activate users' );
        
    for( const user of users )
    {
        try
        {
            await Db.i.db.collection( "users" ).updateOne( {username: user.username }, {$set : { activated: true } } );
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
        throw new Error( 'Admin account cannot be deleted' );

    await Db.i.db.collection( "users" ).deleteOne( { username: deleteUser.username } );

    return true;
};

User.login = async function( username, password )
{
  console.log(password);
    if( !username && !password || !username || !password )
        throw new Error( 'No username or password' );

    const userObj = await Db.i.db.collection( "users" ).findOne( { username: username } );

    if( !userObj )
        throw new Error( 'Username or password is incorrect' );

    const match = bcrypt.compareSync( password, userObj.password );

    if( match )
    {
      if( userObj.activated )
          return new User( userObj );

      else
          return new Error( 'The account is not activated' );
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
        const result = await Db.i.db.collection( "users" ).insertOne( aux );
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
