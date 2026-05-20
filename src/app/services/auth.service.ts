import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface UserInfo { id: number; displayName: string; email: string; }

const DEMO_USER: UserInfo = { id: 1, displayName: 'Demo User', email: 'admin@dclutter.app' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user: UserInfo | null = null;

  login(email: string, password: string): Observable<{ success: boolean; message?: string }> {
    if (email === 'admin@dclutter.app' && password === 'demo123') {
      this._user = DEMO_USER;
      localStorage.setItem('dc_user', JSON.stringify(DEMO_USER));
      return of({ success: true }).pipe(delay(800));
    }
    return of({ success: false, message: 'Invalid credentials. Use admin@dclutter.app / demo123' }).pipe(delay(600));
  }

  logout(): void {
    this._user = null;
    localStorage.removeItem('dc_user');
  }

  getUser(): UserInfo | null {
    if (this._user) return this._user;
    const stored = localStorage.getItem('dc_user');
    if (stored) { this._user = JSON.parse(stored); return this._user; }
    return null;
  }

  isLoggedIn(): boolean { return !!this.getUser(); }

  get initials(): string {
    const u = this.getUser();
    if (!u) return 'U';
    return u.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
