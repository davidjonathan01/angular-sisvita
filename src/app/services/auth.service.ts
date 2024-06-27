import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { getConexionBackend } from '../constants';
import { Tipo_Usuario } from '../model/tipo_usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly BASE_URL: string | undefined;
  private pacienteId: number | null = null; // Almacenar el ID del paciente
  private usuarioId: number | null = null; // Almacenar el ID del paciente
  private especialistaId: number | null = null;
  private administradorId: number | null = null;

  constructor(private http: HttpClient) {
    this.BASE_URL=getConexionBackend();
    console.log(this.BASE_URL)
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
  setUsuarioId(id: number) {
    this.usuarioId = id;
  }

  getUsuarioId(): number | null {
    return this.usuarioId;
  }

  setPacienteId(id: number) {
    this.pacienteId = id;
  }

  getPacienteId(): number | null {
    return this.pacienteId;
  }

  setEspecialistaId(id: number) {
    this.especialistaId = id;
  }

  getEspecialistaId(): number | null {
    return this.especialistaId;
  }

  setAdministradorId(id: number) {
    this.administradorId = id;
  }

  getAdministradorId(): number | null {
    return this.administradorId;
  }
}
