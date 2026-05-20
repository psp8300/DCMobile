import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  email    = '';
  password = '';
  showPw   = false;
  loading  = false;
  error    = '';

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.isLoggedIn()) this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
  }

  fillDemo() { this.email = 'admin@dclutter.app'; this.password = 'demo123'; }

  onLogin() {
    this.error = '';
    if (!this.email || !this.password) { this.error = 'Please enter email and password.'; return; }
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe(res => {
      this.loading = false;
      if (res.success) {
        this.router.navigate(['/tabs/dashboard'], { replaceUrl: true });
      } else {
        this.error = res.message || 'Login failed.';
      }
    });
  }
}
