import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se debe navegar por los siguientes links', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('a[routerLink="/todo"]').textContent
    ).toContain('Inicio');
    expect(
      compiled.querySelector('a[routerLink="/about"]').textContent
    ).toContain('About');
  });
  it('Deberia deslogearse cuando se aprete el boton cerrar session', () => {
    spyOn(component, 'onLogout');
    component.isLoggedIn = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const logoutButton = compiled.querySelector('button.btn-danger');
    logoutButton.click();

    expect(component.onLogout).toHaveBeenCalled();
  });

  it('Deberia mostrar el perfil y el boton de cierre session', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[routerLink="/profile"]')).toBeTruthy();
    expect(compiled.querySelector('button.btn-danger')).toBeTruthy();
  });
});
