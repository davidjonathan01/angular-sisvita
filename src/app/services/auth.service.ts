import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getConexionBackend } from '../constants';
import { Carrera } from '../model/carrera';
import { Genero } from '../model/genero';
import { Tipo_Usuario } from '../model/tipo-usuario';
import { Ubigeo } from '../model/ubigeo';
import { Condicion } from '../model/condicion';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    console.log(this.BASE_URL);
  }

  login(id_tipo_usuario: number, email: string, contrasenia: string): Observable<any> {
    const body = { id_tipo_usuario, email, contrasenia };
    return this.http.post<any>(`${this.BASE_URL}/cus_routes1/login`, body);
  }

  getTipoUsuarios(): Observable<Tipo_Usuario[]> {
    return this.http.get<Tipo_Usuario[]>(`${this.BASE_URL}/tipo_usuario_routes/get_tipos_usuario`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener tipos de usuario: ' + error.message;
      })
    );
  }

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.BASE_URL}/genero_routes/get_generos`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener géneros: ' + error.message;
      })
    );
  }

  getUbigeos(): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(`${this.BASE_URL}/ubigeo_routes/get_ubigeos`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener ubigeo: ' + error.message;
      })
    );
  }
  


  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.BASE_URL}/carrera_routes/get_carreras`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener carreras: ' + error.message;
      })
    );
  }

  getCondiciones(): Observable<Condicion[]> {
    return this.http.get<Condicion[]>(`${this.BASE_URL}/condicion_routes/get_condiciones`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener condiciones: ' + error.message;
      })
    );
  }

  setUsuarioId(id: number) {
    localStorage.setItem('usuarioId', id.toString());
  }

  getUsuarioId(): number | null {
    const id = localStorage.getItem('usuarioId');
    return id ? parseInt(id, 10) : null;
  }

  setPacienteId(id: number) {
    localStorage.setItem('pacienteId', id.toString());
  }

  getPacienteId(): number | null {
    const id = localStorage.getItem('pacienteId');
    return id ? parseInt(id, 10) : null;
  }

  setEspecialistaId(id: number) {
    localStorage.setItem('especialistaId', id.toString());
  }

  getEspecialistaId(): number | null {
    const id = localStorage.getItem('especialistaId');
    return id ? parseInt(id, 10) : null;
  }

  setAdministradorId(id: number) {
    localStorage.setItem('administradorId', id.toString());
  }

  getAdministradorId(): number | null {
    const id = localStorage.getItem('administradorId');
    return id ? parseInt(id, 10) : null;
  }

  
}
