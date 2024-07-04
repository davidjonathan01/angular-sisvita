import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../constants';
import { Paciente } from '../model/paciente';

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

}
