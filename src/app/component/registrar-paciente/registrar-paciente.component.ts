import { CommonModule } from '@angular/common';
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



@Component({
  selector: 'app-registrar-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './registrar-paciente.component.html',
  styleUrl: './registrar-paciente.component.css'
})
export class RegistrarPacienteComponent {
  pacienteArray: Paciente[] = [];
  generos: Genero[] = [];
  carreras: Carrera[] = [];
  ubigeos: Ubigeo[] = [];
  condiciones: Condicion[] = [];

  departamentos_filtrados: string[] = [];
  provincias_filtradas: Ubigeo[] = [];
  distritos_filtrados: Ubigeo[] = [];
  departamento_seleccionado: string = '';
  provincia_seleccionada: string = '';

  pacienteForm: FormGroup;
  usuarioForm: FormGroup;
  personaForm: FormGroup;
  offset: number;
  isEdited: boolean = false;
  page: number;

  onDepartamentoSeleccionado(event: Event) {
    // Lógica adicional que quieras ejecutar cuando se selecciona un departamento
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.departamento_seleccionado = value;
    console.log('Departamento seleccionado:', this.departamento_seleccionado);
    this.loadProvincias();
    // Por ejemplo, cargar provincias basadas en el departamento seleccionado
  }

  onProvinciaSeleccionada(event: Event) {
    // Lógica adicional que quieras ejecutar cuando se selecciona una provincia
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    this.provincia_seleccionada = value;
    console.log('Provincia seleccionada:', this.provincia_seleccionada);
    this.loadDistritos();
    // Por ejemplo, cargar distritos basados en el departamento y provincia seleccionados
  }

  // Suponiendo que tienes un método para manejar la selección de un distrito
  onDistritoSeleccionado(departamento: string, provincia: string, distrito: string): void {
    // Llamar a la API para obtener el id_ubigeo basado en el departamento, provincia y distrito seleccionados
    this.pacienteService.getUbigeo(departamento, provincia, distrito).subscribe({
      next: (response: any) => {
        if ('data' in response && 'id_ubigeo' in response.data) {
          const idUbigeo = response.data.id_ubigeo;
          if (this.pacienteForm && this.pacienteForm.get('id_ubigeo')) {
            this.pacienteForm.get('id_ubigeo')?.setValue(idUbigeo);
          } else {
            console.error('El formulario o el campo id_ubigeo no están disponibles');
          }
        } else {
          console.error('La respuesta no contiene el campo id_ubigeo', response);
        }
      },
      error: (error) => {
        console.error('Error al obtener el id_ubigeo', error);
      }
    });
  }

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private pacienteService: PacienteService,
    private authService: AuthService, private router: Router) {
    this.page = 1;
    this.offset = new Date().getTimezoneOffset();

    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl('', []),
      id_tipo_usuario: new FormControl('1', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    this.personaForm = new FormGroup({
      id_persona: new FormControl('', []),
      doc_identidad: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]),
      nombres: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fec_nacimiento: new FormControl('', [Validators.required]),
      id_genero: new FormControl('', [Validators.required]),
      num_telefono: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]),
    });

    this.pacienteForm = new FormGroup({
      id_paciente: new FormControl('', []),
      //id_ubigeo: new FormControl('', [Validators.required]),
      id_condicion: new FormControl('', [Validators.required]),
      id_carrera: new FormControl(''),
      //id_persona: new FormControl('', [Validators.required]),
      //id_usuario: new FormControl('', [Validators.required]),
      id_ubigeo_departamento: new FormControl('', [Validators.required]),
      id_ubigeo_provincia: new FormControl('', [Validators.required]),
      id_ubigeo_distrito: new FormControl('', [Validators.required])
    });
  }



  ngOnInit(): void {
    this.getPacientes();
    this.loadCarreras();
    this.loadGeneros();
    this.loadUbigeos();
    this.loadCondiciones();
    this.loadDepartamentos();
    this.loadProvincias();
    this.loadDistritos();
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
    if (this.usuarioForm.valid && this.personaForm.valid && this.pacienteForm.valid) {
      // Primero, registrar el usuario
      this.pacienteService.registrarUsuario(this.usuarioForm.value).subscribe({
        next: (resultadoUsuario: any) => {
          // Aquí asumimos que el backend devuelve el ID del usuario creado
          const usuarioResponse = resultadoUsuario as UsuarioResponse;
          const idUsuario = resultadoUsuario.data.id_usuario;
          // Ahora, establecer el ID del usuario en el formulario de la persona y registrar la persona
          
          this.pacienteService.registrarPersona(this.personaForm.value).subscribe({
            next: (resultadoPersona: any) => {
              // Similarmente, asumimos que el backend devuelve el ID de la persona creada
              const personaResponse = resultadoPersona as PersonaResponse;
              const idPersona = resultadoPersona.data.id_persona;
              // Establecer el ID de la persona y el ID del usuario en el formulario del paciente
              this.pacienteForm.get('id_persona')!.setValue(idPersona);
              this.pacienteForm.get('id_usuario')!.setValue(idUsuario);
              // Finalmente, registrar el paciente
              this.pacienteService.registrarPaciente(this.pacienteForm.value).subscribe({
                next: (resultadoPaciente) => {
                  // Manejar la respuesta exitosa, por ejemplo, mostrando una alerta al usuario
                  console.log('Paciente registrado con éxito', resultadoPaciente);
                },
                error: (error) => {
                  // Manejar errores al registrar el paciente
                  console.error('Error al registrar el paciente', error);
                }
              });
            },
            error: (error) => {
              // Manejar errores al registrar la persona
              console.error('Error al registrar la persona', error);
            }
          });
        },
        error: (error) => {
          // Manejar errores al registrar el usuario
          console.error('Error al registrar el usuario', error);
        }
      });
    } else {
      // Manejar la validación fallida de los formularios
      console.error('Formularios no válidos');
    }
  }


  /*registrarPaciente(): void {
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
  }*/

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
  
  loadDepartamentos() {
      this.authService.getDepartamentosUnicos().subscribe(
          (result: any) => {
              this.departamentos_filtrados = result.data;
          },
          (err: any) => {
              console.error('Error al cargar departamentos', err);
          }
      );
  }
  
  loadProvincias() {
      // Asegúrate de tener una variable para el departamento seleccionado, por ejemplo:
      // departamentoSeleccionado: string = 'Lima';
      this.authService.getProvinciasUnicas(this.departamento_seleccionado).subscribe(
          (result: any) => {
              this.provincias_filtradas = result.data;
          },
          (err: any) => {
              console.error('Error al cargar provincias', err);
          }
      );
  }

  loadDistritos() {
    this.authService.getDistritosUnicos(this.departamento_seleccionado, this.provincia_seleccionada).subscribe(
        (result: any) => {
            this.distritos_filtrados = result.data;
        },
        (err: any) => {
            console.error('Error al cargar distritos', err);
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

  loadCondiciones() {
    this.authService.getCondiciones().subscribe(
      (result: any) => {
        this.condiciones = result.data;
      },
      (err: any) => {
        console.error('Error al cargar condiciones', err);
      }
    );
  }
  


  }
