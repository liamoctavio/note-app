import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a form with 3 controls', () => {
    expect(component.profileForm.contains('name')).toBeTruthy();
    expect(component.profileForm.contains('email')).toBeTruthy();
    expect(component.profileForm.contains('password')).toBeTruthy();
    expect(component.profileForm.contains('confirmPassword')).toBeTruthy();

  });
  it('should make the name control required', () => {
    const control = component.profileForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });
});
