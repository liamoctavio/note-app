import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private jsonUrl =
    'https://mibuckectsum3.s3.us-east-1.amazonaws.com/tareas.json'; // URL de tu API

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.jsonUrl).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
