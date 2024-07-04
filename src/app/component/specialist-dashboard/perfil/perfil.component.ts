import { Component, OnInit } from '@angular/core';
import { Especialista } from '../../../model/especialista';
import Swal from 'sweetalert2';
import { MostrarPerfilService } from '../../../services/mostrar-perfil.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit  {

  especialista: Especialista | null = null;

  constructor(
    private mostrarPerfilService: MostrarPerfilService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarPerfilEspecialista();
  }

  cargarPerfilEspecialista(): void {
    const idEspecialista = this.authService.getEspecialistaId();
    console.log(idEspecialista);
    if (idEspecialista) {
      this.mostrarPerfilService.getPerfilEspecialista(idEspecialista).subscribe(
        (result: any) => {
          this.especialista = result.data;
          console.log(this.especialista?.persona.nombres);
          Swal.fire('¡Éxito!', 'Perfil cargado correctamente', 'success');
        },
        (err: any) => {
          console.error('Error al obtener perfil del especialista', err);
          Swal.fire('¡Error!', 'Error al cargar el perfil del especialista. Por favor, intente de nuevo más tarde.', 'error');
        }
      );
    } else {
      Swal.fire({
        title: '¡Advertencia!',
        text: 'No se encontró el ID del especialista. Por favor, inicie sesión nuevamente.',
        icon: 'warning',
        timer: 1000,
        showConfirmButton: false
      });
    }
  }
}
