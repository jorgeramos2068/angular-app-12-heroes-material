import { Component, Input } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
})
export class HeroCardComponent {
  @Input() hero: Hero = {
    id: '',
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };
}
