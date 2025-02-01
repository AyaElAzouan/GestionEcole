import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEtuComponent } from './inscription-etu.component';

describe('InscriptionEtuComponent', () => {
  let component: InscriptionEtuComponent;
  let fixture: ComponentFixture<InscriptionEtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionEtuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionEtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
