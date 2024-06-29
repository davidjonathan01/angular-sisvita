import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../model/resultado';
import { getConexionBackend } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class ResultadoPacienteService {
  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/results_paciente/`;
    console.log(this.BASE_URL);
   }

  getResultadosPaciente(id_paciente: number): Observable<any> {
    return this.http.get<string[]>(`${this.BASE_URL}get_resultados_paciente/${id_paciente}`);
  }
  getInvitaciones(id_resultado: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}/get_invitaciones_paciente/${id_resultado}`);
  }
}
