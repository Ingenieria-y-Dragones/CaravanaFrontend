import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVistaComponent } from './menu-vista.component';

describe('MenuVistaComponent', () => {
  let component: MenuVistaComponent;
  let fixture: ComponentFixture<MenuVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
