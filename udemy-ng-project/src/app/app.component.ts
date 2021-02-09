import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.autoLogin();
  }
}
