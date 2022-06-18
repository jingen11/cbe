const User = (module.exports = function (aux) {
  this.id = aux.id;
  this.username = aux.username;
  this.password = aux.password;
  this.hash = aux.hash;
  this.role = aux.role;
});

User.prototype.login = function (username, password) {};

User.signUp = function (username, password, confirmPassword) {};

User.Role = { NORMAL_USER, ADMIN };
