import { TestBed } from '@angular/core/testing';

import { RegistrarPacienteService } from './registrar-paciente.service';

describe('RegistrarPacienteService', () => {
  let service: RegistrarPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
