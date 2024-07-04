import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { Carrera } from '../../model/carrera';
import { Condicion } from '../../model/condicion';
import { Genero } from '../../model/genero';
import { Paciente } from '../../model/paciente';
import { PersonaResponse } from '../../model/persona-response';
import { Ubigeo } from '../../model/ubigeo';
import { UsuarioResponse } from '../../model/usuario-response';
import { AuthService } from '../../services/auth.service';
import { PacienteService } from '../../services/paciente.service';

import { RegistrarPacienteService } from '../../services/registrar-paciente.service';



@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.css'
})
export class RegistrarPacienteComponent implements OnInit{
  generos: Genero[] = [];
  carreras: Carrera[] = [];
  carrerasFilter: Carrera[] = [];
  ubigeos: Ubigeo[] = [];
  condiciones: Condicion[] = [];

  departamentos_filtrados: string[] = [];
  provincias_filtradas: Ubigeo[] = [];
  distritos_filtrados: Ubigeo[] = [];
  departamento_seleccionado: string = '';
  provincia_seleccionada: string = '';


  personaForm: FormGroup;
  offset: number;
  isEdited: boolean = false;
  page: number;


  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private registrarPacienteService: RegistrarPacienteService ) {
    this.page = 1;
    this.offset = new Date().getTimezoneOffset();

   
    this.personaForm = new FormGroup({
      id_persona: new FormControl('', []),
      doc_identidad: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
      nombres: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fec_nacimiento: new FormControl('', [Validators.required]),
      id_genero: new FormControl('', [Validators.required]),
      num_telefono: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]),
      id_tipo_usuario: new FormControl({ value: '1', disabled: true }), // Aquí se define el valor fijo y se deshabilita
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)]),
      id_ubigeo: new FormControl('', [Validators.required]),

      id_condicion: new FormControl('', [Validators.required]),
      id_carrera: new FormControl(''),

      departamento_seleccionado: new FormControl(''),
      provincia_seleccionada: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadDepartamentos();
    this.loadCarreras();
    this.loadGeneros();
    this.loadCondiciones();
  }


  loadGeneros() {
    this.registrarPacienteService.getGeneros().subscribe(
      (result: any) => {
        this.generos = result.data;
      },
      (err: any) => {
        console.error('Error al cargar generos', err);
      }
    );
  }

  loadCondiciones() {
    const idUbigeo =this.personaForm.get('id_ubigeo')?.value;
    console.log("id_ ubigeo",idUbigeo)
    this.registrarPacienteService.getCondiciones().subscribe(
      (result: any) => {
        this.condiciones = result.data;
      },
      (err: any) => {
        console.error('Error al cargar condiciones', err);
      }
    );
  }

  loadCarreras() {
    this.registrarPacienteService.getCarreras().subscribe(
      (result: any) => {
        this.carreras = result.data;
      },
      (err: any) => {
        console.error('Error al cargar carreras', err);
      }
    );
  }


  loadDepartamentos() {
    this.registrarPacienteService.getDepartamentos().subscribe(
      (result: any) => {
        this.departamentos_filtrados = result.data;
      },
      (err: any) => {
        console.error('Error al cargar departamentos', err);
      }
    );
  }

  onDepartamentoChange() {
    const departamento = this.personaForm.get('departamento_seleccionado')?.value;
    console.log('Departamento',departamento)
    if (departamento) {
      console.log()
      this.registrarPacienteService.getProvincias(departamento).subscribe(
        (result: any) => {
          this.provincias_filtradas = result.data;
          this.distritos_filtrados = []; // Reset distritos
          this.personaForm.get('provincia_seleccionada')?.reset();
          this.personaForm.get('id_ubigeo')?.reset();
        },
        (err: any) => {
          console.error('Error al cargar provincias', err);
        }
      );
    }
  }
  
  onProvinciaChange() {
    const provincia = this.personaForm.get('provincia_seleccionada')?.value;
    console.log('Provincia',provincia)
    if (provincia) {
      this.registrarPacienteService.getDistritos(provincia).subscribe(
        (result: any) => {
          this.distritos_filtrados = result.data;
          console.log(this.distritos_filtrados)
        },
        (err: any) => {
          console.error('Error al cargar distritos', err);
        }
      );
    }
  }

  onCondicionChange() {
    const condicion = this.personaForm.get('id_condicion')?.value;
    if (condicion === '2') { // Estudiante universitario
      this.registrarPacienteService.getCarreras().subscribe(
        (result: any) => {
          this.carrerasFilter = result.data;
          console.log(this.carrerasFilter)
          this.personaForm.get('id_carrera')?.setValidators([Validators.required]);
          this.personaForm.get('id_carrera')?.updateValueAndValidity();
        },
        (err: any) => {
          console.error('Error al cargar carreras', err);
        }
      );
    } else {
      this.carrerasFilter = [];
      this.personaForm.get('id_carrera')?.clearValidators();
      this.personaForm.get('id_carrera')?.updateValueAndValidity();
    }
    console.log(condicion)
    const carrera = this.personaForm.get('id_carrera')
    console.log("Carrera", carrera)
  }

  registrarPaciente(): void {
    if (this.personaForm.valid) {
    const formValue = { ...this.personaForm.value };
    delete formValue.departamento_seleccionado;
    delete formValue.provincia_seleccionada;
    // Mostrar el contenido del formulario en la consola
    console.log('Formulario a enviar:', formValue);

    this.registrarPacienteService.registrarPaciente(formValue).subscribe(
      (result: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Se registró exitosamente el paciente',
        });
        this.personaForm.reset();
      },
      (err: any) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el paciente',
        });
      }
    );
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Formulario incompleto',
      text: 'Por favor, complete todos los campos requeridos',
    });
  }
}
}