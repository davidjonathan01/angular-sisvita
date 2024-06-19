import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from '../model/test';
import { getConexionBackend } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class TestService {
    readonly BASE_URL: string | undefined;

    constructor(private http: HttpClient){
        this.BASE_URL=getConexionBackend();
        this.BASE_URL=`${this.BASE_URL}/test_routes/`
        console.log(this.BASE_URL)
    }

    getTests(): Observable<Test[]> {
        return this.http.get<Test[]>(`${this.BASE_URL}get_tests`);
    }
    
    getPreguntasPorTest(id_test: number): Observable<string[]> {
        return this.http.get<string[]>(`${this.BASE_URL}get_preguntas/${id_test}`);
      }
}