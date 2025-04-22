import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaVistaComponent } from './ruta-vista.component';

describe('RutaVistaComponent', () => {
  let component: RutaVistaComponent;
  let fixture: ComponentFixture<RutaVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
