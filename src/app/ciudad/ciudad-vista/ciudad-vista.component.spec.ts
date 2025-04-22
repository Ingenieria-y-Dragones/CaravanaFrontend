import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiudadVistaComponent } from './ciudad-vista.component';

describe('CiudadVistaComponent', () => {
  let component: CiudadVistaComponent;
  let fixture: ComponentFixture<CiudadVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiudadVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CiudadVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
