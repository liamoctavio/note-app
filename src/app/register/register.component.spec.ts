import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormsModule,
  AbstractControl,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RegisterComponent,
  hasSpecialCharacterValidator,
} from './register.component';
import { UserService } from '../services/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería requerir un nombre', () => {
    const nameControl = component.registerForm.get('name');
    nameControl?.setValue('');
    expect(nameControl?.valid).toBeFalse();

    nameControl?.setValue('Octavio');
    expect(nameControl?.valid).toBeTrue();
  });

  it('debería requerir un correo electrónico válido', () => {
    const emailControl = component.registerForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('correo-no-valido');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('correo@valido.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('debería requerir una contraseña válida', () => {
    const passwordControl = component.registerForm.get('password');

    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('12345');
    expect(passwordControl?.valid).toBeFalse();

    passwordControl?.setValue('123456');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('debería mostrar el mensaje de éxito después de un registro exitoso', () => {
    component.registrationSuccess = true;
    fixture.detectChanges();

    const successMessage =
      fixture.debugElement.nativeElement.querySelector('.alert-success');
    expect(successMessage).toBeTruthy();
    expect(successMessage.textContent).toContain(
      'Registro exitoso. Ahora puedes iniciar sesión.'
    );
  });

  it('debería validar que la contraseña contenga un carácter especial', () => {
    const controlWithSpecialChar = { value: 'password!' } as AbstractControl;
    const controlWithoutSpecialChar = { value: 'password' } as AbstractControl;

    expect(hasSpecialCharacterValidator()(controlWithSpecialChar)).toBeNull(
      'La contraseña con carácter especial debería ser válida'
    );
    expect(hasSpecialCharacterValidator()(controlWithoutSpecialChar)).toEqual(
      { hasSpecialCharacter: true },
      'La contraseña sin carácter especial no debería ser válida'
    );
  });

  it('debería ser inválido si los campos requeridos están vacíos', () => {
    component.registerForm.reset();
    expect(component.registerForm.valid).toBeFalse();
  });

  it('debería ser válido si todos los campos están llenos correctamente', () => {
    component.registerForm.setValue({
      name: 'John Doe',
      email: 'correo@gmail.com',
      password: 'Password@123.',
    });
    expect(component.registerForm.valid).toBeTrue();
  });
});
