
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface UserRecord {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'my_decks_auth_users';
  private currentUserKey = 'my_decks_auth_current';
  private users: UserRecord[] = [];

  constructor(private router: Router) {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try { this.users = JSON.parse(raw); } catch { this.users = []; }
    }
  }

  private saveUsers() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }

  private setCurrent(username: string) {
    localStorage.setItem(this.currentUserKey, JSON.stringify({ username }));
  }

  private getCurrent(): string | null {
    const raw = localStorage.getItem(this.currentUserKey);
    try { return raw ? JSON.parse(raw).username : null; } catch { return null; }
  }

  isLoggedIn(): boolean {
    return this.getCurrent() != null;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    console.log(this.users)
    if (user) {
      this.setCurrent(username);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  register(username: string, password: string): { ok: boolean; message?: string } {
    if (!username || !password) {
      return { ok: false, message: 'Usuario y contraseña son requeridos' };
    }
    if (password.length > 9) {
      return { ok: false, message: 'La contraseña debe tener máximo 9 caracteres' };
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      return { ok: false, message: 'La contraseña debe ser alfanumérica' };
    }
    if (this.users.find(u => u.username === username)) {
      return { ok: false, message: 'El usuario ya existe' };
    }
    this.users.push({ username, password });
    this.saveUsers();
    this.setCurrent(username);
    return { ok: true };
  }

  getCurrentUser(): string | null {
    return this.getCurrent();
  }
}