import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaListaComponent } from './ruta-lista.component';

describe('RutaListaComponent', () => {
  let component: RutaListaComponent;
  let fixture: ComponentFixture<RutaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RutaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RutaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
