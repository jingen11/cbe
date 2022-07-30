export default class User{
    username;
    id;
    role;
    activated;

  constructor( aux ){
      if(aux){
          this.username = aux.username;
          this.id = aux.id;
          this.role = aux.role;
          this.activated = aux.activated;
      }
  }

  toAux(){
      return {
          username: this.username,
          id: this.id,
          role: this.role,
          activated: this.activated,
      }
  }
}