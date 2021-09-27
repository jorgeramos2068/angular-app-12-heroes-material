import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  public term: string = '';
  public heroes: Hero[] = [];
  public selectedHero: Hero | undefined = undefined;
  public error: boolean = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  search(): void {
    this.heroesService.searchHero(this.term.trim()).subscribe({
      next: (heroes) => {
        if (heroes.length > 0 && this.term.trim().length > 0) {
          this.heroes = heroes;
          this.error = false;
        } else {
          this.heroes = [];
          this.error = true;
        }
      },
    });
  }

  getSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.term = hero.superhero;
    this.heroesService.getHero(hero.id!).subscribe({
      next: (hero) => (this.selectedHero = hero),
    });
  }
}
