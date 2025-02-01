import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionAjoutComponent } from './inscription-ajout.component';

describe('InscriptionAjoutComponent', () => {
  let component: InscriptionAjoutComponent;
  let fixture: ComponentFixture<InscriptionAjoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionAjoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionAjoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
