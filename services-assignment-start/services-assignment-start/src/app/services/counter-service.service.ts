import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {
  count = 0;

  constructor() { }

  onSwitch(){
    this.count++;
    console.log(this.count);
  }
}
