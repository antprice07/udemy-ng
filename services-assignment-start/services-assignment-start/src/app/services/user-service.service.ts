import { Injectable } from '@angular/core';
import { CounterServiceService } from './counter-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private cntSvc:CounterServiceService){}

  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  setToActive(id:number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id,1);
    this.cntSvc.onSwitch();
  }

  setToInactive(id:number){
    this.inactiveUsers.push(this.activeUsers[id])
    this.activeUsers.splice(id,1);
    this.cntSvc.onSwitch();
  }

  
}
