import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe({
      next: (resp) => (this.heroes = resp),
      error: (err) => {
        this.heroes = [];
        console.log(err);
      },
    });
  }
}
