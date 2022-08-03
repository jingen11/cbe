export default class Vehicle {
    id;
    registrationNum;
    roadTaxExpDate;
    puspakomExpDate;
    petrolCardNum;
    touchNGoCardNum;
    active;
  
    constructor(aux) {
        if (aux) {    
            this.id = aux._id.toString();
            this.registrationNum = aux.registrationNum;
            this.roadTaxExpDate = aux.roadTaxExpDate ? aux.roadTaxExpDate : null;
            this.puspakomExpDate = aux.puspakomExpDate ? aux.puspakomExpDate : null;
            this.petrolCardNum = aux.petrolCardNum ? aux.petrolCardNum : null;
            this.touchNGoCardNum = aux.touchNGoCardNum ? aux.touchNGoCardNum : null;
            this.active = aux.active !== null ? aux.active : false;
        }
    }
  
    toAux() {
      return (
        {  
            id: this.id,
            registrationNum: this.registrationNum,
            roadTaxExpDate: this.roadTaxExpDate,
            puspakomExpDate: this.puspakomExpDate,
            petrolCardNum: this.petrolCardNum,
            touchNGoCardNum: this.touchNGoCardNum,
            active: this.active
        });
    }

    update( newProps ){
        const modifiedProps = {
            id: this.id,
            registrationNum: newProps.registrationNum ? newProps.registrationNum : this.registrationNum, 
            roadTaxExpDate: newProps.roadTaxExpDate ? newProps.roadTaxExpDate : this.roadTaxExpDate,
            puspakomExpDate: newProps.puspakomExpDate ? newProps.puspakomExpDate : this.puspakomExpDate,
            petrolCardNum: newProps.petrolCardNum ? newProps.petrolCardNum : this.petrolCardNum,
            touchNGoCardNum: newProps.touchNGoCardNum ? newProps.touchNGoCardNum : this.touchNGoCardNum
        };

        this.registrationNum = modifiedProps.registrationNum;
        this.roadTaxExpDate = modifiedProps.roadTaxExpDate;
        this.puspakomExpDate = modifiedProps.puspakomExpDate;
        this.petrolCardNum = modifiedProps.petrolCardNum;
        this.touchNGoCardNum = modifiedProps.touchNGoCardNum;
    }
};
  