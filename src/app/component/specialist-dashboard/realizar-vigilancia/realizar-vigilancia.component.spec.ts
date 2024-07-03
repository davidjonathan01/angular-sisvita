import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarVigilanciaComponent } from './realizar-vigilancia.component';

describe('RealizarVigilanciaComponent', () => {
  let component: RealizarVigilanciaComponent;
  let fixture: ComponentFixture<RealizarVigilanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarVigilanciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealizarVigilanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
