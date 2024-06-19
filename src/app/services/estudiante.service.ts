import { Injectable } from '@angular/core';
import { Estudiante } from '../model/estudiante';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getConexionBackend } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient){
    this.BASE_URL=getConexionBackend();
    this.BASE_URL=`${this.BASE_URL}/estudiante_routes/`
    console.log(this.BASE_URL)
  }
 
  getEstudiantes(): Observable <Estudiante[]>{
      return this.http.get<Estudiante[]>(`${this.BASE_URL}get_estudiantes`);
  }

  registrarEstudiante(form: any){
      return this.http.post(`${this.BASE_URL}create_estudiante`, form);
  }

  actualizarEstudiante (id: number, form: any){
      return this.http.put(`${this.BASE_URL}update_estudiante/${id}`, form);
  }

  eliminarEstudiante (id: number){
      return this.http.delete(`${this.BASE_URL}delete_estudiante/${id}`);
  }
}
