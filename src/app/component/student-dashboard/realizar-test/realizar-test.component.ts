import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test } from '../../../model/test';
import { TestService } from '../../../services/test.service';
import { Pregunta } from '../../../model/pregunta';
import { Opcion } from '../../../model/opcion';
import Swal from 'sweetalert2';
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

  selectedTestId: number | null = null;
  respuestasSeleccionadas: number[] = []; // Almacenar los puntajes seleccionados
  allQuestionsAnswered: boolean = false; // Nuevo estado para verificar si todas las preguntas han sido respondidas


  constructor(private testService: TestService) {}

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
    const evaluacion = {
      id_test: this.selectedTestId,
      id_paciente: 1,  // Aquí debes agregar el ID del paciente real
      respuestas: this.respuestasSeleccionadas
    };

    this.testService.realizarEvaluacion(evaluacion).subscribe(
      (result: any) => {
        console.log('Evaluación realizada con éxito', result);
        Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Test enviado ...',
            text: 'Se realizó correctamente el test!',
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