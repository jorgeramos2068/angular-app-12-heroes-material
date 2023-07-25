import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private baseUrl: string = environment.endpointBaseUrl;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHero(heroId: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${heroId}`);
  }
}
