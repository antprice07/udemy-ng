import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthResponseDate, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: [],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseDate>;

    this.isLoading = true;

    if (this.isLoginMode) {
      // authObs = this.authSvc.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email,password: password}));
    } else {
      authObs = this.authSvc.signUp(email, password);
    }
    // authObs.subscribe(
    //   (res) => {
    //     console.log(res);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMsg) => {
    //     console.log(errorMsg);
    //     this.error = errorMsg;
    //     this.isLoading = false;
    //   }
    form.reset();
  }

  constructor(private authSvc: AuthService, private router: Router, private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onHandleError() {
    this.error = null;
  }
}
