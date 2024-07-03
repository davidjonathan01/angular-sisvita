import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { Estudiante } from '../../model/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import Swal from 'sweetalert2';
import { CommonModule, formatDate } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-registrar-estudiante',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgxPaginationModule],
  templateUrl: './registrar-estudiante.component.html',
  styleUrl: './registrar-estudiante.component.css'
})
export class RegistrarEstudianteComponent {
  estudianteArray: Estudiante[] = [];
  estudianteForm: FormGroup;
  offset: number;
  isEdited:boolean=false;
  page:number;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private estudianteService: EstudianteService) {
    this.page = 1;
    this.offset = new Date().getTimezoneOffset();
    this.estudianteForm = new FormGroup({
      id_estudiante: new FormControl('', []),
      doc_identidad: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
      nombres: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fec_nacimiento: new FormControl('', [Validators.required]),
      id_genero: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required, Validators.minLength(5)]),
      num_telefono: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]),
      carrera: new FormControl('', [Validators.required]),
      contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
    this.getEstudiantes();
  }

  getEstudiantes(): void {
    this.estudianteService.getEstudiantes().subscribe(
      (result: any) => {
        this.estudianteArray = result.data;
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

  registrarEstudiante(): void {
    console.log('test');
    console.log(this.estudianteForm.value);
    if (this.isEdited) {
      this.actualizarEstudiante();
    } else {
      this.estudianteService.registrarEstudiante(this.estudianteForm.value).subscribe(
        (result: any) => {
          console.log(this.estudianteForm.value);
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'registrarEstudiante ...',
            text: 'Se registró exitosamente los datos del estudiante!',
          });
          this.estudianteForm.reset();
          this.getEstudiantes();
        },
        (err: any) => {
          console.log(this.estudianteForm.value);
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

  editarEstudiante(estudiante: Estudiante): void {
    Swal.fire({
      title: '¿Está seguro de editar este estudiante?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Sí',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteForm.setValue({
          id_estudiante: estudiante.id_estudiante,
          doc_identidad: estudiante.doc_identidad,
          nombres: estudiante.nombres,
          apellidos: estudiante.apellidos,
          fec_nacimiento: formatDate(estudiante.fec_nacimiento, 'yyyy-MM-dd', this.locale, 'UTC' + this.offset),
          id_genero: estudiante.id_genero,
          email: estudiante.email,
          direccion: estudiante.direccion,
          num_telefono: estudiante.num_telefono,
          anio_ingreso: estudiante.anio_ingreso,
          id_carrera: estudiante.id_carrera,
          contrasenia: estudiante.contrasenia
        });
        this.isEdited = true;
      }
    });
  }

  actualizarEstudiante(): void {
    const id = this.estudianteForm.value.id_estudiante;

    this.estudianteService.actualizarEstudiante(id, this.estudianteForm.value).subscribe(
      (result: any) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'actualizarEstudiante ...',
          text: '¡Se actualizó exitosamente el estudiante!',
        });
        this.estudianteForm.reset();
        this.getEstudiantes();
        this.isEdited = false;
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia ...',
          text: '¡Ha ocurrido un error al actualizar el estudiante!',
        });
      }
    );
  }

  eliminarEstudiante(estudiante:Estudiante):void{
    Swal.fire({
      title: 'Esta seguro de eliminar la persona seleccionada?',
      showCancelButton:true,
      cancelButtonText:'No',
      confirmButtonText:'Si',
      focusCancel:true,
    }).then((result)=>{
      if(result.isConfirmed){
        this.estudianteService.eliminarEstudiante(estudiante.id_estudiante).subscribe(
          (reult:any)=>{
            console.log(estudiante);
            Swal.close();
            Swal.fire({
              icon:'success',
              title: 'eliminarEstudiante ...',
              text: 'Se elimino exitosamente al estudiante!',
            });
            this.getEstudiantes();
          },
          (err:any)=>{
            console.log(estudiante);
            console.log(err);
            Swal.close();
            Swal.fire({
              icon:'error',
              title: 'Advertencia ...',
              text: 'Ah ocurrido un error al eliminar Estudiante!',
            });
          }
        );

      }//end if
    })//end then
  }//end metodo


  




}
