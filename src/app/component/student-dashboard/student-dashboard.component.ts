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

@Component({
    selector: 'app-student-dashboard',
    standalone: true,
    templateUrl: './student-dashboard.component.html',
    styleUrl: './student-dashboard.component.css',
    imports: [CommonModule, RealizarTestComponent, ResultsComponent, SolicitarCitaComponent, CalendarioCitasComponent, InboxComponent, ForoComponent, TalleresComponent, RecursosComponent]
})
export class StudentDashboardComponent {
  activeForm: string = '';

  showForm(form: string) {
    this.activeForm = form;
  }

}
