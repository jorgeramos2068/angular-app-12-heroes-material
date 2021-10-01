import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  get auth(): Auth {
    return this.authService.auth;
  }

  ngOnInit(): void {}

  logout(): void {
    this.router.navigate(['/auth']);
  }
}
