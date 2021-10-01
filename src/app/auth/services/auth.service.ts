import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.endpointBaseUrl;

  constructor(private http: HttpClient) {}

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/users/1`);
  }
}
