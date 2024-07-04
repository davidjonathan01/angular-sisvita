import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../constants';
import { Paciente } from '../model/paciente';
import { Especialista } from '../model/especialista';
import { Administrador } from '../model/administrador';

@Injectable({
  providedIn: 'root'
})
export class MostrarPerfilService {
  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    console.log(this.BASE_URL);
  }

  getPerfilPaciente(idPaciente: number): Observable<any> {
    return this.http.get<Paciente>(`${this.BASE_URL}/monstrar_perfil/get_paciente/${idPaciente}`);
  }

  getPerfilEspecialista(idEspecialista: number): Observable<any> {
    return this.http.get<Especialista>(`${this.BASE_URL}/monstrar_perfil/get_especialista/${idEspecialista}`);
  }

  getPerfilAdministrador(idAdministrador: number): Observable<any> {
    return this.http.get<Administrador>(`${this.BASE_URL}/monstrar_perfil/get_administrador/${idAdministrador}`);
  }

}
