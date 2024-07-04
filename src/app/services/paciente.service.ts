import { Injectable } from '@angular/core';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient){
    this.BASE_URL=getConexionBackend();
    this.BASE_URL=`${this.BASE_URL}/paciente_routes/`
    console.log(this.BASE_URL)
  }
 
  getPacientes(): Observable <Paciente[]>{
      return this.http.get<Paciente[]>(`${this.BASE_URL}get_pacientes`);
  }

  registrarPaciente(form: any){
      return this.http.post(`${this.BASE_URL}create_paciente`, form)
  }

  registrarUsuario(form: any){
      return this.http.post(`${this.BASE_URL}create_usuario`, form)
  }

  registrarPersona(form: any){
      return this.http.post(`${this.BASE_URL}create_persona`, form)
  }

  actualizarPaciente (id: number, form: any){
      return this.http.put(`${this.BASE_URL}update_paciente/${id}`, form);
  }

  eliminarPaciente (id: number){
      return this.http.delete(`${this.BASE_URL}delete_paciente/${id}`);
  }

  getUbigeo (departamento: string, provincia: string, distrito: string){
    const body = {
      departamento,
      provincia,
      distrito
    };
    return this.http.post(`${this.BASE_URL}identificar_ubigeo_routes/identificar_ubigeo`, body);
  }
}
