import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getConexionBackend } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASE_URL: string | undefined;
  private baseUrl = 'http://127.0.0.1:5000/cus_routes1/login'; // Cambia esto por la URL de tu servidor Flask

  constructor(private http: HttpClient) {
    this.BASE_URL=getConexionBackend();
    this.BASE_URL=`${this.BASE_URL}/cus_routes1/login`
    console.log(this.BASE_URL)
   }

  login(user_type: string, email: string, contrasenia: string): Observable<any> {
    const body = { user_type, email, contrasenia };

    return this.http.post<any>(this.baseUrl, body).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error en la autenticación: ' + error.message;
      })
    );
  }
}
