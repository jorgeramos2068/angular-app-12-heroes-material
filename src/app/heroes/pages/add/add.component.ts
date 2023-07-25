import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  public hero: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  public publishers = [
    { id: 'DC Comics', desc: 'DC Comics' },
    { id: 'Marvel Comics', desc: 'Marvel Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHero(id)))
      .subscribe({
        next: (hero) => {
          this.hero = hero;
        },
      });
  }

  submit(): void {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    if (this.hero.id) {
      // Update
      this.heroesService.updateHero(this.hero).subscribe({
        next: (resp) => {
          console.log('Updated:', resp);
        },
      });
    } else {
      // Create
      this.heroesService.saveHero(this.hero).subscribe({
        next: (hero) => {
          this.router.navigate(['/heroes/edit', hero.id]);
          console.log('Created:', hero);
        },
      });
    }
  }
}
