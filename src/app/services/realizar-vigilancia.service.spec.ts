import { TestBed } from '@angular/core/testing';

import { RealizarVigilanciaService } from './realizar-vigilancia.service';

describe('RealizarVigilanciaService', () => {
  let service: RealizarVigilanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealizarVigilanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
