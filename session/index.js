const Session = global.Session = function( sessionId, user )
{
    this.sessionId = sessionId;
    this.currentUser = user;
};

Session.deactivate = function( sessionId ) 
{
    delete Session.byId[sessionId];
}

Session.activate = function( sessionId, user )
{
    return Session.byId[sessionId] = new Session( sessionId, user );
}

Session.byId = {};