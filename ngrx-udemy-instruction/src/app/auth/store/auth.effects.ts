import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';

export interface AuthResponseDate {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  key = environment.firebaseAPIKey;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseDate>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.key}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData) => {
            const expirationDate = new Date(
              new Date().getTime() + +resData.expiresIn * 1000
            );
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.localId,
              expirationDate: expirationDate,
            });
          }),
          catchError((errorRes) => {let errorMsg = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.LoginFail(errorMsg));
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'This email exists already!';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMsg = 'This email does not exist!';
              break;
            case 'INVALID_PASSWORD':
              errorMsg = 'Incorrect password!';
              break;
          }
            return of(new AuthActions.LoginFail(errorMsg));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );
}
