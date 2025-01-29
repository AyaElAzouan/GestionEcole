import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesEtudiantComponent } from './mes-etudiant.component';

describe('MesEtudiantComponent', () => {
  let component: MesEtudiantComponent;
  let fixture: ComponentFixture<MesEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
