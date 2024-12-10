import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    // Simular una respuesta exitosa después de un retraso
    console.log(`Enlace de restablecimiento enviado a ${email}`);
    return of({ success: true, message: 'Enlace de restablecimiento enviado' });
  }
}
