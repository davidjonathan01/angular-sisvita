import { TestBed } from '@angular/core/testing';

import { MostrarPerfilService } from './mostrar-perfil.service';

describe('MostrarPerfilService', () => {
  let service: MostrarPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
