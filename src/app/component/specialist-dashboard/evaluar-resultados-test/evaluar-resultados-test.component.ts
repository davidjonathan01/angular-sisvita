import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { ResultadoService } from '../../../services/resultado.service';
import { Resultado } from '../../../model/resultado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluar-resultados-test',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './evaluar-resultados-test.component.html',
  styleUrl: './evaluar-resultados-test.component.css'
})
export class EvaluarResultadosTestComponent implements OnInit{
  resultados: Resultado[] = [];
  id_especialista: number = 1; // Debe ser asignado dinámicamente según el especialista que haya iniciado sesión

  constructor(private resultadoService: ResultadoService) {}

  ngOnInit() {
    this.cargarResultados();
  }

  cargarResultados() {
    this.resultadoService.getResultadosEspecialista(this.id_especialista).subscribe(
      (result: any) => {
        this.resultados = result.data;
      },
      (err: any) => {
        console.error('Error al cargar resultados', err);
        Swal.fire({
          icon: 'error',
          title: 'Error ...',
          text: 'Error al cargar resultados!',
        });
      }
    );
  }
  culminarResultado(resultado: Resultado) {
    this.resultadoService.updateResultado(resultado.id_resultado, { interpretacion: resultado.interpretacion }).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Interpretación guardada exitosamente!',
        });
      },
      (err: any) => {
        console.error('Error al guardar interpretación', err);
        Swal.fire({
          icon: 'error',
          title: 'Error ...',
          text: 'Error al guardar interpretación!',
        });
      }
    );
  }
}