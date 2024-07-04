import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getConexionBackend } from '../constants';
import { Genero } from '../model/genero';
import { Condicion } from '../model/condicion';
import { Carrera } from '../model/carrera';
import { Ubigeo } from '../model/ubigeo';

@Injectable({
  providedIn: 'root'
})
export class RegistrarPacienteService {

  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    console.log(this.BASE_URL);
  }

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(`${this.BASE_URL}/genero_routes/get_generos`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener géneros: ' + error.message;
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

  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.BASE_URL}/carrera_routes/get_carreras`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener carreras: ' + error.message;
      })
    );
  }

  getDepartamentos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/registrar_paciente/departamentos`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener departamentos: ' + error.message;
      })
    );
  }

  getProvincias(departamento: string): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(`${this.BASE_URL}/registrar_paciente/provincias/${departamento}`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener provincias: ' + error.message;
      })
    );
  }

  getDistritos(provincia: string): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(`${this.BASE_URL}/registrar_paciente/distritos/${provincia}`).pipe(
      catchError(error => {
        console.error(error);
        throw 'Error al obtener distritos: ' + error.message;
      })
    );
  }

  registrarPaciente(form: any) {
    return this.http.post(`${this.BASE_URL}/registrar_paciente/registrar`, form);
  }


}