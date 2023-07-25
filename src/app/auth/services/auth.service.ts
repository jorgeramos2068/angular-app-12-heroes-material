import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.endpointBaseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) {}

  get auth(): Auth {
    return { ...this._auth! };
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/users/1`).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('heroesToken', auth.id))
    );
  }

  logout(): void {
    this._auth = undefined;
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('heroesToken')) {
      return of(false);
    }
    return this.http.get<Auth>(`${this.baseUrl}/users/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }
}
