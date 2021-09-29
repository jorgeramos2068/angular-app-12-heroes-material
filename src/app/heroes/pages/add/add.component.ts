import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';

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
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
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
          this.showSnackBar(`${resp.superhero} updated`);
        },
      });
    } else {
      // Create
      this.heroesService.saveHero(this.hero).subscribe({
        next: (hero) => {
          this.router.navigate(['/heroes/edit', hero.id]);
          this.showSnackBar('Hero has been created');
        },
      });
    }
  }

  deleteHero(): void {
    const localDialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.hero,
    });
    localDialog.afterClosed().subscribe({
      next: (resp) => {
        if (resp) {
          this.heroesService.deleteHero(this.hero.id!).subscribe({
            next: (resp) => {
              console.log(resp);
              this.router.navigate(['/heroes']);
            },
          });
        }
      },
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok', {
      duration: 2000,
    });
  }
}
