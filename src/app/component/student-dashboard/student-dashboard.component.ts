import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealizarTestComponent } from './realizar-test/realizar-test.component';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule,RealizarTestComponent,ResultsComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  activeForm: string = '';

  showForm(form: string) {
    this.activeForm = form;
  }

}
