import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../model/paciente';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  paciente?: Paciente;
  readonly BASE_URL: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarDatosPaciente();
  }

  cargarDatosPaciente(): void {
    // Reemplaza 'url-a-tu-backend' con la URL de tu backend
    this.http.get<Paciente>(`${this.BASE_URL}/paciente_routes/get_paciente/{id}`).subscribe({
      next: (datosPaciente: Paciente) => {
        this.paciente = datosPaciente;
      },
      error: (error) => {
        console.error('Hubo un error al obtener los datos del paciente:', error);
      }
    });
  }

}
