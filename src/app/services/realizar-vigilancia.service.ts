import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../model/resultado';
import { getConexionBackend } from '../constants';
import { Test } from '../model/test';
import { Estado } from '../model/estado';
import { Invitacion } from '../model/invitacion';

@Injectable({
  providedIn: 'root'
})
export class RealizarVigilanciaService {

  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient) {
    this.BASE_URL = getConexionBackend();
    this.BASE_URL = `${this.BASE_URL}/cus_realizar_vigilancia/`;
    console.log(this.BASE_URL);
   }

  getResultadosEspecialista(id_especialista: number): Observable<any> {
    return this.http.get<string[]>(`${this.BASE_URL}resultados_especialista/${id_especialista}`);
  }
  updateResultado(id_resultado: number, data: Partial<Resultado>): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}update_resultado/${id_resultado}`, data);
  }
  getTests(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.BASE_URL}get_tests`);
  }
  invitarRealizarTest(invitacion: Invitacion): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}invitar_test`, invitacion);
  }
  getEscalasByTest(id_test: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}get_escalas_by_test/${id_test}`);
  }
}
