import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../../model/paciente';
import Swal from 'sweetalert2';
import { MostrarPerfilService } from '../../../services/mostrar-perfil.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  paciente: Paciente | null=null;
  
  constructor(private mostrarPerfilService: MostrarPerfilService, private authService: AuthService) { }

  ngOnInit(): void {
    this.cargarPerfilPaciente();
  }

  cargarPerfilPaciente(): void {
    const idPaciente = this.authService.getPacienteId();
    console.log(idPaciente);
    if (idPaciente) {
      this.mostrarPerfilService.getPerfilPaciente(idPaciente).subscribe(
        (result: any)=> {
          this.paciente = result.data;
          console.log(this.paciente?.persona.nombres);
          Swal.fire('¡Éxito!', 'Perfil cargado correctamente', 'success');
        },
        (err: any) => {
          console.error('Error al obtener perfil del paciente', err);
          Swal.fire('¡Error!', 'Error al cargar el perfil del paciente. Por favor, intente de nuevo más tarde.', 'error');
        }
      );
    } else {
      Swal.fire({
        title: '¡Advertencia!',
        text: 'No se encontró el ID del paciente. Por favor, inicie sesión nuevamente.',
        icon: 'warning',
        timer: 1000,
        showConfirmButton: false
      });
    }
  }


  
}
