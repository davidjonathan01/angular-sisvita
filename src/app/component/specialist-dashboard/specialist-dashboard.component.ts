import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizarVigilanciaComponent } from './realizar-vigilancia/realizar-vigilancia.component';
import { EvaluarResultadosTestComponent } from './evaluar-resultados-test/evaluar-resultados-test.component';
@Component({
  selector: 'app-specialist-dashboard',
  standalone: true,
  imports: [CommonModule,EvaluarResultadosTestComponent,RealizarVigilanciaComponent],
  templateUrl: './specialist-dashboard.component.html',
  styleUrl: './specialist-dashboard.component.css'
})
export class SpecialistDashboardComponent {
  activeForm: string = '';

  showForm(form: string) {
    this.activeForm = form;
  }


}
