import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con los controles esperados', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });
  
  it('debería requerir un correo electrónico válido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();
  
    emailControl?.setValue('correo-no-valido');
    expect(emailControl?.valid).toBeFalse();
  
    emailControl?.setValue('correo@valido.com');
    expect(emailControl?.valid).toBeTrue();
  });
  it('debería requerir una contraseña', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();
  
    passwordControl?.setValue('contraseña123');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('debería llamar al método login cuando el formulario es válido', () => {
    spyOn(component, 'login'); // Espía el método login
  
    component.loginForm.setValue({
      email: 'usuario@valido.com',
      password: 'password123',
    });
    fixture.debugElement.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
  
    expect(component.login).toHaveBeenCalled();
  });



});
