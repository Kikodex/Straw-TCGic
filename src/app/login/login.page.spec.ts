import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthService } from '../../core/services/auth.service';

class RouterStub {
  navigate = jasmine.createSpy('navigate');
}

class AuthServiceStub {
  isLoggedIn = jasmine.createSpy('isLoggedIn').and.returnValue(false);
  login = jasmine.createSpy('login').and.callFake(() => Promise.resolve(true));
}

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: RouterStub;
  let authService: AuthServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [CommonModule, ReactiveFormsModule, IonicModule.forRoot()],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useClass: AuthServiceStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    authService = TestBed.inject(AuthService) as any;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('redirects to home if already logged in on init', () => {
    authService.isLoggedIn.and.returnValue(true);

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('shows error when form invalid', () => {
    fixture.detectChanges();

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
    expect(component.error).toContain('Por favor completa');
  });

  it('logs in and navigates when credentials valid', fakeAsync(() => {
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    authService.login.and.returnValue(Promise.resolve(true));

    component.onSubmit();
    flushMicrotasks();

    expect(authService.login).toHaveBeenCalledWith('user', 'pass');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.error).toBeNull();
  }));

  it('sets error when login fails', fakeAsync(() => {
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    authService.login.and.returnValue(Promise.reject(new Error('Credenciales inválidas')));

    component.onSubmit();
    flushMicrotasks();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.error).toBe('Credenciales inválidas');
  }));

  it('goRegister navigates to register', () => {
    component.goRegister();

    expect(router.navigate).toHaveBeenCalledWith(['/register']);
  });
});
