import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegisterPage } from './register.page';
import { AuthService } from 'src/core/services/auth.service';

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

class AuthServiceStub {
  register = jasmine.createSpy('register').and.returnValue({ ok: true });
}

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: RouterStub;
  let authService: AuthServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [CommonModule, ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    authService = TestBed.inject(AuthService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('shows error when form invalid', () => {
    fixture.detectChanges();

    component.onRegister();

    expect(authService.register).not.toHaveBeenCalled();
    expect(component.error).toContain('Usuario y contraseña');
  });

  it('registers and navigates on success', () => {
    component.registerForm.setValue({ username: 'user1', password: 'pass123' });
    authService.register.and.returnValue({ ok: true });

    component.onRegister();

    expect(authService.register).toHaveBeenCalledWith('user1', 'pass123');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.error).toBeNull();
  });

  it('sets error when registration fails', () => {
    component.registerForm.setValue({ username: 'user1', password: 'pass123' });
    authService.register.and.returnValue({ ok: false, message: 'fail' });

    component.onRegister();

    expect(authService.register).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.error).toBe('fail');
  });

  it('goBack navigates to login', () => {
    component.goBack();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
