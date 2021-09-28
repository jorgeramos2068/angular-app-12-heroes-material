import { Component, OnInit } from '@angular/core';
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

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  submit(): void {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    this.heroesService.saveHero(this.hero).subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });
  }
}
