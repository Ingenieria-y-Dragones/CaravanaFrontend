import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaravanaVistaComponent } from './caravana-vista.component';

describe('CaravanaVistaComponent', () => {
  let component: CaravanaVistaComponent;
  let fixture: ComponentFixture<CaravanaVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaravanaVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaravanaVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
