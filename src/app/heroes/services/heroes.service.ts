import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>('http://localhost:3002/heroes');
  }

  getHero(heroId: string): Observable<Hero> {
    return this.http.get<Hero>(`http://localhost:3002/heroes/${heroId}`);
  }
}
