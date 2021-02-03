import { Component, EventEmitter, OnInit, } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit{
  aUsers:string[]=[];
  constructor(private userSvc:UserServiceService){}

  ngOnInit(){
    this.aUsers = this.userSvc.activeUsers;
  }
  
  onSetToInactive(id: number) {
    this.userSvc.setToInactive(id);
  }

  
}
