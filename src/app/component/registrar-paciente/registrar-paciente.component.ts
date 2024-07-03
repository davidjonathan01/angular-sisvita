import { CommonModule, formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { Carrera } from '../../model/carrera';
import { Genero } from '../../model/genero';
import { AuthService } from '../../services/auth.service';
import { PacienteService } from '../../services/paciente.service';
import { Ubigeo } from '../../model/ubigeo';
import { Paciente } from '../../model/paciente';


@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.css'
})
export class RegistrarPacienteComponent {
  pacienteArray: Paciente[] = [];
  generos: Genero[] = [];
  carreras: Carrera[] = [];
  ubigeos: Ubigeo[] = [];

  pacienteForm: FormGroup;
  offset: number;
  isEdited: boolean = false;
  page: number;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private pacienteService: PacienteService,
    private authService: AuthService, private router: Router) {
    this.page = 1;
    this.offset = new Date().getTimezoneOffset();
    this.pacienteForm = new FormGroup({
      id_paciente: new FormControl('', []),
      doc_identidad: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      nombres: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fec_nacimiento: new FormControl('', [Validators.required]),
      id_genero: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(5)]),
      num_telefono: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]),
      id_carrera: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (result: any) => {
        this.pacienteArray = result.data;
      }, (err: any) => {
        console.log(err);
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia ...',
          text: 'Ah ocurrido un error!',
        });
      }
    );
  }

  registrarPaciente(): void {
    console.log('test');
    console.log(this.pacienteForm.value);
    if (this.isEdited) {
      this.actualizarPaciente();
    } else {
      this.pacienteService.registrarPaciente(this.pacienteForm.value).subscribe(
        (result: any) => {
          console.log(this.pacienteForm.value);
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'registrarPaciente ...',
            text: 'Se registró exitosamente los datos del paciente!',
          });
          this.pacienteForm.reset();
          this.getPacientes();
        },
        (err: any) => {
          console.log(this.pacienteForm.value);
          console.log(err);
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Advertencia ...',
            text: 'Ah ocurrido un error!',
          });
        }
      );
    }
  }

  editarPaciente(paciente: Paciente): void {
    Swal.fire({
      title: '¿Está seguro de editar este paciente?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteForm.setValue({
          /*id_paciente: paciente.id_paciente,
          doc_identidad: paciente.doc_identidad,
          nombres: paciente.nombres,
          apellidos: paciente.apellidos,
          fec_nacimiento: formatDate(paciente.fec_nacimiento, 'yyyy-MM-dd', this.locale, 'UTC' + this.offset),
          id_genero: paciente.id_genero,
          email: paciente.email,
          direccion: paciente.direccion,
          num_telefono: paciente.num_telefono,
          anio_ingreso: paciente.anio_ingreso,
          id_carrera: paciente.id_carrera,
          contrasenia: paciente.contrasenia*/
        });
        this.isEdited = true;
      }
    });
  }

  actualizarPaciente(): void {
    const id = this.pacienteForm.value.id_paciente;

    this.pacienteService.actualizarPaciente(id, this.pacienteForm.value).subscribe(
      (result: any) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'actualizarPaciente ...',
          text: '¡Se actualizó exitosamente el paciente!',
        });
        this.pacienteForm.reset();
        this.getPacientes();
        this.isEdited = false;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia ...',
          text: '¡Ha ocurrido un error al actualizar el paciente!',
        });
      }
    );
  }

  eliminarPaciente(paciente: Paciente): void {
    Swal.fire({
      title: 'Esta seguro de eliminar la persona seleccionada?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.pacienteService.eliminarPaciente(paciente.id_paciente).subscribe(
          (reult: any) => {
            console.log(paciente);
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'eliminarPaciente ...',
              text: 'Se elimino exitosamente al paciente!',
            });
            this.getPacientes();
          },
          (err: any) => {
            console.log(paciente);
            console.log(err);
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Advertencia ...',
              text: 'Ah ocurrido un error al eliminar Paciente!',
            });
          }
        );

      }//end if
    })//end then
  }//end metodo


  loadGeneros() {
    this.authService.getGeneros().subscribe(
      (result: any) => {
        this.generos = result.data;
      },
      (err: any) => {
        console.error('Error al cargar generos', err);
      }
    );
  }

  loadUbigeos() {
    this.authService.getUbigeos().subscribe(
      (result: any) => {
        this.ubigeos = result.data;
      },
      (err: any) => {
        console.error('Error al cargar ubigeos', err);
      }
    );
  }

  loadCarreras() {
    this.authService.getCarreras().subscribe(
      (result: any) => {
        this.carreras = result.data;
      },
      (err: any) => {
        console.error('Error al cargar carreras', err);
      }
    );
  }
  


  }
