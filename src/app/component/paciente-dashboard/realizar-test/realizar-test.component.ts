import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test } from '../../../model/test';
import { TestService } from '../../../services/test.service';
import { Pregunta } from '../../../model/pregunta';
import { Opcion } from '../../../model/opcion';
import Swal from 'sweetalert2';
import { Evaluacion } from '../../../model/evaluacion';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-realizar-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realizar-test.component.html',
  styleUrls: ['./realizar-test.component.css']
})
export class RealizarTestComponent implements OnInit {
  tests: Test[] = [];
  preguntas: Pregunta[] = [];
  opciones: Opcion[]=[];
  evaluacion_realizada: Evaluacion | null=null;

  selectedTestId: number | null = null;
  respuestasSeleccionadas: number[] = []; // Almacenar los puntajes seleccionados
  allQuestionsAnswered: boolean = false; // Nuevo estado para verificar si todas las preguntas han sido respondidas
  nivelAnsiedad: any = null; // Nuevo estado para almacenar la escala determinada
  puntaje: number | null = null;


  constructor(private testService: TestService, private authService: AuthService) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.testService.getTests().subscribe(
      (result: any) => {
        this.tests = result.data;
      },
      (err: any) => {
        console.error('Error al cargar tests', err);
      }
    );
  }

  onSelectTest(id_test: number) {
    this.selectedTestId = id_test;
    this.loadPreguntas(id_test);
    this.loadOpciones(id_test);
  }

  loadPreguntas(id_test: number) {
    this.testService.getPreguntasPorTest(id_test).subscribe(
      (result: any) => {
        this.preguntas = result.data;
        this.respuestasSeleccionadas = new Array(this.preguntas.length).fill(null); // Inicializar con valores nulos
        this.checkAllQuestionsAnswered(); // Verificar si todas las preguntas han sido respondidas al cargar nuevas preguntas
      },
      (err: any) => {
        console.error('Error al cargar preguntas', err);
      }
    );
  }

  loadOpciones(id_test:number){
    this.testService.getOpcionesPorTest(id_test).subscribe(
      (result: any) => {
        this.opciones = result.data;
      },
      (err: any) => {
        console.error('Error al cargar opciones', err);
      }
    );
  }
  onSelectOption(index: number, puntaje: number) {
    this.respuestasSeleccionadas[index] = puntaje;
    this.checkAllQuestionsAnswered();
  }

  checkAllQuestionsAnswered() {
    this.allQuestionsAnswered = this.respuestasSeleccionadas.every(resp => resp !== null);
  }

  enviarTest() {
    const idPaciente = this.authService.getPacienteId();
    const idEspecialista = 1; // ID del especialista directamente por ahor
    if (idPaciente === null) {
      Swal.fire('Error', 'No se pudo obtener el ID del paciente. Por favor, inicie sesión nuevamente.', 'error');
      return;
    }

    const evaluacion = {
      id_test: this.selectedTestId,
      id_paciente: idPaciente, 
      id_especialista: idEspecialista, // Añadimos el id_especialista aquí
      respuestas: this.respuestasSeleccionadas
    };

    this.testService.realizarEvaluacion(evaluacion).subscribe(
      (result: any) => {
        console.log('Evaluación realizada con éxito', result);
        this.evaluacion_realizada=result.data;
        //Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Test enviado ...',
          text: 'Se realizó correctamente el test!',
          timer: 2000,  // Mostrar por al menos un segundo
        }).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Puntaje Determinado',
            text: `Puntaje obtenido: ${this.evaluacion_realizada?.puntaje}`,
            timer: 4000,  // Mostrar por al menos dos segundos
          });
        });
      },
      (err: any) => {
        console.error('Error al realizar la evaluación', err);
        Swal.fire({
          icon: 'error',
          title: 'Error ...',
          text: 'Error al realizar el test!',
        });
      }
    );
  }

}