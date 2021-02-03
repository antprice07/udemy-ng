import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  iaUsers:string[]=[];

  constructor(private userSvc:UserServiceService){}

  ngOnInit(){
    this.iaUsers = this.userSvc.inactiveUsers;
  }
  
  onSetToActive(id: number) {
    this.userSvc.setToActive(id);
  }

}
