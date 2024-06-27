import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Tipo_Usuario } from '../../model/tipo_usuario';
import { ReactiveFormsModule ,FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  tipo_usuarios : Tipo_Usuario[]=[];

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      id_tipo_usuario: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  ngOnInit() {
    this.loadTipoUsuarios();
  }

  loadTipoUsuarios() {
    this.authService.getTipoUsuarios().subscribe(
      (result: any) => {
        this.tipo_usuarios = result.data;
      },
      (err: any) => {
        console.error('Error al cargar tipos de usuario', err);
      }
    );
  }

  // login.component.ts
onSubmit(): void {
  if (this.loginForm.valid) {
    const { id_tipo_usuario, email, contrasenia } = this.loginForm.value;
    this.authService.login(id_tipo_usuario, email, contrasenia).subscribe(
      response => {
        if (response.status === 200) {
          this.authService.setUsuarioId(response.id_usuario); // Almacenar el ID del usuario
          if (response.id_tipo_usuario === 1) { // Paciente
            this.authService.setPacienteId(response.id_paciente);
          } else if (response.id_tipo_usuario === 2) { // Especialista
            this.authService.setEspecialistaId(response.id_especialista);
          } else if (response.id_tipo_usuario === 3) { // Administrador
            this.authService.setAdministradorId(response.id_administrador);
          }
          console.log('Tipo de usuario devuelto:', response.id_tipo_usuario); // Imprimir el tipo de usuario en la consola
          this.redirectUser(response.id_tipo_usuario);
          Swal.fire('¡Éxito!', 'Inicio de sesión exitoso', 'success');
        } else {
          Swal.fire('¡Error!', response.message, 'error');
        }
      },
      error => {
        Swal.fire('¡Error!', 'Error de servidor. Por favor, intente de nuevo más tarde.', 'error');
      }
    );
  } else {
    Swal.fire({
      title: '¡Advertencia!',
      text: 'Por favor, complete todos los campos correctamente.',
      icon: 'warning',
      timer: 1000,
      showConfirmButton: false
    });
  }
}


  redirectUser(id_tipo_usuario: number) {
    console.log("Id: ",id_tipo_usuario)
    if (id_tipo_usuario === 1) {
      this.router.navigate(['/student-dashboard']);
    } else if (id_tipo_usuario === 2) {
      this.router.navigate(['/specialist-dashboard']);
    } else if (id_tipo_usuario === 3) {
      this.router.navigate(['/admin-dashboard']);
    }
  }
}
