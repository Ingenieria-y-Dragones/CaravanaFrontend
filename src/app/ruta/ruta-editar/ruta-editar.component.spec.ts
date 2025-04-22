import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEditarComponent } from './ruta-editar.component';

describe('RutaEditarComponent', () => {
  let component: RutaEditarComponent;
  let fixture: ComponentFixture<RutaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
