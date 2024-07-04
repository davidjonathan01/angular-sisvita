import { Component, OnInit } from '@angular/core';
import { Administrador } from '../../../model/administrador';
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
export class PerfilComponent implements OnInit {
  administrador: Administrador | null = null;

  constructor(
    private mostrarPerfilService: MostrarPerfilService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarPerfilAdministrador();
  }

  cargarPerfilAdministrador(): void {
    const idAdministrador = this.authService.getAdministradorId();
    console.log(idAdministrador);
    if (idAdministrador) {
      this.mostrarPerfilService.getPerfilAdministrador(idAdministrador).subscribe(
        (result: any) => {
          this.administrador = result.data;
          console.log(this.administrador?.persona.nombres);
          Swal.fire('¡Éxito!', 'Perfil cargado correctamente', 'success');
        },
        (err: any) => {
          console.error('Error al obtener perfil del administrador', err);
          Swal.fire('¡Error!', 'Error al cargar el perfil del administrador. Por favor, intente de nuevo más tarde.', 'error');
        }
      );
    } else {
      Swal.fire({
        title: '¡Advertencia!',
        text: 'No se encontró el ID del administrador. Por favor, inicie sesión nuevamente.',
        icon: 'warning',
        timer: 1000,
        showConfirmButton: false
      });
    }
  }
}