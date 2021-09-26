import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [],
})
export class HeroComponent implements OnInit {
  public hero!: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap((params) => this.heroesService.getHero(params.id)))
      .subscribe({
        next: (hero) => {
          console.log(hero);
          this.hero = hero;
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }
}
