import { environment } from './../../../../environments/environment';
import { User, FbAuthResponse } from './../../../shared/interfaces';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class AuthService {

  error$: Subject<string> = new Subject<string>()

  constructor(
    private http: HttpClient
  ) {}

  get token(): string | null {
    const expiresDate = new Date(localStorage.getItem('tokenExpiresDate'))
    if(new Date() > expiresDate){
      this.logout()
    }
    return localStorage.getItem('token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fbApiKey}`
    return this.http.post(url, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    const message: string = error.error.error.message
    switch(message){
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Пользователь с такой почтой не существует')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неправельно введен пароль')
        break
      case 'USER_DISABLED':
        this.error$.next('Пользователь заблокирован')
        break
      default:
        this.error$.next(`Неизвестная ошибка: ${message}`)
    }

    return throwError(error)
  }

  setToken(response: FbAuthResponse | null) {
    if(response){
      const expiresDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('tokenExpiresDate', expiresDate.toString())
      localStorage.setItem('token', response.idToken)
    } else {
      localStorage.clear()
    }

  }
}
