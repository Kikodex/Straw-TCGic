import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(9), Validators.pattern('^[a-zA-Z0-9]+$')]]
    });
  }

  ngOnInit(): void {}

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.error = 'Usuario y contraseña deben cumplir el formato';
      return;
    }
    const { username, password } = this.registerForm.value;
    const res = this.auth.register(username, password);
    if (res.ok) {
      this.router.navigate(['/home']);
    } else {
      this.error = res.message ?? 'Error al crear la cuenta';
    }
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}