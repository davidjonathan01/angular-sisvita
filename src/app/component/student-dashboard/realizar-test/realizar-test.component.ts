import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Test } from '../../../model/test';
import { TestService } from '../../../services/test.service';
import { Pregunta } from '../../../model/pregunta';

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
  selectedTestId: number | null = null;
  respuestas: string[] = [];

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

  onSelectTest(testId: number) {
    this.selectedTestId = testId;
    this.loadPreguntas(testId);
    this.setRespuestas(testId);
  }

  loadPreguntas(testId: number) {
    this.testService.getPreguntasPorTest(testId).subscribe(
      (result: any) => {
        this.preguntas = result.data;
      },
      (err: any) => {
        console.error('Error al cargar preguntas', err);
      }
    );
  }

  setRespuestas(testId: number) {
    // Define las opciones de respuesta específicas para cada tipo de test
    if (testId === 1) { // ID del test de Zung
      this.respuestas = ["Muy pocas veces", "Algunas veces", "Muchas veces", "Casi siempre"];
    } else if (testId === 2) { // ID del test de Stai
      this.respuestas = ["Nunca", "Raramente", "Algunas veces", "Frecuentemente"];
    } else if (testId === 3) { // ID del test de BAI
      this.respuestas = ["No en absoluto", "Levemente", "Moderadamente", "Severamente"];
    } else {
      this.respuestas = [];
    }
  }
}