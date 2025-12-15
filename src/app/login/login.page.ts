import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) this.router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.error = 'Por favor completa usuario y contraseña';
      return;
    }
    const { username, password } = this.loginForm.value;
    (async () => {
      try {
        const ok = await this.auth.login(username, password);
        console.log('login resultad', ok);
        if (ok) this.router.navigate(['/home']);
      } catch (err: any) {
        console.warn('login error', err);
        this.error = err?.message ?? 'Credenciales inválidas';
      }
    })();
  }

  goRegister(): void {
    this.router.navigate(['/register']);
  }
}