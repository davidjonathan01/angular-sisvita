import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../../model/resultado';
import { FormsModule } from '@angular/forms';
import { ResultadoPacienteService } from '../../../services/resultado-paciente.service';
import Swal from 'sweetalert2';
import { MatGridListModule } from '@angular/material/grid-list';
import { Invitacion } from '../../../model/invitacion';
import { AuthService } from '../../../services/auth.service';
import { Estado } from '../../../model/estado';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule,FormsModule, MatGridListModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  id_paciente: number | null = null; // Inicialmente null, será asignado dinámicamente
  resultados: Resultado[] = [];
  invitaciones: Invitacion[] = []; // Almacenar las invitaciones por resultado
  estados: Estado[]=[];
  resultadosFiltrados: Resultado[] = [];
  resultadoSeleccionado: number | null = null; // Guardar el ID del resultado seleccionado
  cargandoInvitaciones: boolean = false; // Estado de carga
  mostrarModal: boolean = false;
  modalTitle: string = '';
  modalData: any = null;
  modalType: string = '';
  estadoSeleccionado: string = '';

  constructor(private resultadoPacienteService: ResultadoPacienteService, private authService: AuthService) {}

  ngOnInit() {
    this.id_paciente = this.authService.getPacienteId();
    if (this.id_paciente !== null) {
      this.cargarResultados();
      this.cargarEstados();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error ...',
        text: 'No se pudo obtener el ID del paciente!',
      });
    }
  }

  cargarResultados() {
    if (this.id_paciente !== null) {
      this.resultadoPacienteService.getResultadosPaciente(this.id_paciente).subscribe(
        (result: any) => {
          this.resultados = result.data;
          this.resultadosFiltrados = this.resultados;
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
  }
  cargarEstados() {
    this.resultadoPacienteService.getEstadosResultado().subscribe(
      (result: any) => {
        this.estados = result.data;
        console.log(this.estados)
      },
      (err: any) => {
        console.error('Error al cargar estados', err);
        Swal.fire({
          icon: 'error',
          title: 'Error ...',
          text: 'Error al cargar estados!',
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

  filtrarResultados() {
    if (this.estadoSeleccionado) {
      this.resultadosFiltrados = this.resultados.filter(
        resultado => resultado.id_estado.toString() === this.estadoSeleccionado
      );
    } else {
      this.resultadosFiltrados = this.resultados;
    }
  }

  mostrarDetalles(resultado: any, tipo: string) {
    this.modalTitle = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    this.modalData = resultado;
    this.modalType = tipo;
    this.mostrarModal = true;

    if (tipo === 'invitaciones') {
      this.cargarInvitaciones(resultado.id_resultado);
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.modalData = null;
    this.modalType = '';
  }
  
}
