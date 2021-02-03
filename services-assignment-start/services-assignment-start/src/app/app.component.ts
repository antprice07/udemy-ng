import { Component, OnInit } from '@angular/core';
import { CounterServiceService } from './services/counter-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  count:number;
  
  constructor(private cntSvc: CounterServiceService){}


  ngOnInit(){
    this.count = this.cntSvc.count;
  }
 
  
  

 
}
