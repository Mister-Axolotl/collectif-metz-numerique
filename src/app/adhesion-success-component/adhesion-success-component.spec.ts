import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesionSuccessComponent } from './adhesion-success-component';

describe('AdhesionSuccessComponent', () => {
  let component: AdhesionSuccessComponent;
  let fixture: ComponentFixture<AdhesionSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdhesionSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdhesionSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
