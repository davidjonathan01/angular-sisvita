import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Resultado } from '../../../model/resultado';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})

export class ResultsComponent{
  resultados: Resultado[] = [];

  loadResultados(){
    // Cargar resultados de ese paciente en especifico
    
  }
}
