import { TestBed } from '@angular/core/testing';

import { ResultadoPacienteService } from './resultado-paciente.service';

describe('ResultadoPacienteService', () => {
  let service: ResultadoPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
