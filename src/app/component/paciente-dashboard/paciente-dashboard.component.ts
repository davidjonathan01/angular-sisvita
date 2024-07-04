import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizarTestComponent } from './realizar-test/realizar-test.component';
import { ResultsComponent } from './results/results.component';
import { SolicitarCitaComponent } from "./solicitar-cita/solicitar-cita.component";
import { CalendarioCitasComponent } from "./calendario-citas/calendario-citas.component";
import { InboxComponent } from "./inbox/inbox.component";
import { ForoComponent } from "./foro/foro.component";
import { TalleresComponent } from "./talleres/talleres.component";
import { RecursosComponent } from "./recursos/recursos.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { HomeComponent } from "../home/home.component";

@Component({
    selector: 'app-paciente-dashboard',
    standalone: true,
    templateUrl: './paciente-dashboard.component.html',
    styleUrl: './paciente-dashboard.component.css',
    imports: [CommonModule, RealizarTestComponent, ResultsComponent, SolicitarCitaComponent, CalendarioCitasComponent, InboxComponent, ForoComponent, TalleresComponent, RecursosComponent, PerfilComponent, HomeComponent]
})
export class PacienteDashboardComponent {
  activeForm: string = '';

  showForm(form: string) {
    this.activeForm = form;
  }

}
