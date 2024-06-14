import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule ,FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      user_type: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { user_type, email, contrasenia } = this.loginForm.value;
      console.log('Datos enviados:', { user_type, email, contrasenia }); // Verificar los datos enviados
      this.authService.login(user_type, email, contrasenia).subscribe(
        response => {
          if (response.status=200) {
            this.redirectUser(response.user_type);
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

  redirectUser(userType: string) {
    if (userType === 'estudiante') {
      this.router.navigate(['/student-dashboard']);
    } else if (userType === 'especialista') {
      this.router.navigate(['/specialist-dashboard']);
    } else if (userType === 'administrador') {
      this.router.navigate(['/admin-dashboard']);
    }
  }
}
