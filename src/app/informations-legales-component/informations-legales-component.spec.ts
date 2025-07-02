import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsLegalesComponent } from './informations-legales-component';

describe('InformationsLegalesComponent', () => {
  let component: InformationsLegalesComponent;
  let fixture: ComponentFixture<InformationsLegalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationsLegalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationsLegalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
