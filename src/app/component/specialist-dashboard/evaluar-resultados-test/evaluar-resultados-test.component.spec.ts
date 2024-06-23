import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluarResultadosTestComponent } from './evaluar-resultados-test.component';

describe('EvaluarResultadosTestComponent', () => {
  let component: EvaluarResultadosTestComponent;
  let fixture: ComponentFixture<EvaluarResultadosTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluarResultadosTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluarResultadosTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
