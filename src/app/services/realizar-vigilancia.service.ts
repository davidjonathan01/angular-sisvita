import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resultado } from '../model/resultado';
import { getConexionBackend } from '../constants';
import { Test } from '../model/test';
import { Tipo_Test } from '../model/tipo_test';
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
  // Nuevo método para obtener los tipos de tests
  getTipoTests(): Observable<Tipo_Test[]> {
    return this.http.get<Tipo_Test[]>(`${this.BASE_URL}get_tipo_tests`);
  }
  enviarCorreo(correo: string, mensaje: string): Observable<any> {
    const body = { correo, mensaje };
    return this.http.post(`${this.BASE_URL}enviar_correo`, body);
  }
  enviarWhatsapp(numero: string, mensaje: string): Observable<any> {
    const body = { numero, mensaje };
    return this.http.post(`${this.BASE_URL}enviar_whatsapp`, body);
  }
}
