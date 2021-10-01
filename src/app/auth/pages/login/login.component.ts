import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    this.authService.login().subscribe({
      next: (user) => {
        console.log(user);
        if (user.id) {
          this.router.navigate(['/heroes']);
        }
      },
    });
  }
}
