import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3000/user/login/';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private _http: HttpClient) {}

  logIn(data:any): Observable<any> {
    // console.log('login');
    // console.log(data);

    return this._http.post<any>(this.apiURL, data).pipe(
      tap(res => {
        const token = res.token; // Adjust this according to your API response
        // console.log(token);
        if (token) {
          localStorage.setItem('accesstoken', token);
          this.tokenSubject.next(token);
        }
      })
    );
  }
}
