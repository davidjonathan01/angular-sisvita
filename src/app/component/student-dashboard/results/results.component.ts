import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../../model/resultado';
import { ResultadoPacienteService } from '../../../services/resultado-paciente.service';
import Swal from 'sweetalert2';
import { Evaluacion } from '../../../model/evaluacion';
import { Invitacion } from '../../../model/invitacion';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  id_paciente: number = 1;
  resultados: Resultado[] = [];
  invitaciones: Invitacion[] = []; // Almacenar las invitaciones por resultado
  resultadoSeleccionado: number | null = null; // Guardar el ID del resultado seleccionado
  cargandoInvitaciones: boolean = false; // Estado de carga

  constructor(private resultadoPacienteService: ResultadoPacienteService) {}

  ngOnInit() {
    this.cargarResultados();
  }

  cargarResultados() {
    this.resultadoPacienteService.getResultadosPaciente(this.id_paciente).subscribe(
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

  cargarInvitaciones(id_resultado: number) {
    this.resultadoSeleccionado = id_resultado;
    this.cargandoInvitaciones = true; // Iniciar estado de carga
    this.resultadoPacienteService.getInvitaciones(id_resultado).subscribe(
      (result: any) => {
        this.invitaciones = result.data;
        this.cargandoInvitaciones = false; // Finalizar estado de carga
      },
      (err: any) => {
        console.error('Error al cargar las invitaciones', err);
        Swal.fire({
          icon: 'error',
          title: 'Error ...',
          text: 'Error al cargar las invitaciones de test!',
        });
        this.cargandoInvitaciones = false; // Finalizar estado de carga en caso de error
      }
    );
  }
}
