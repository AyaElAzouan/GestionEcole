import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtuComponent } from './gestion-etu.component';

describe('GestionEtuComponent', () => {
  let component: GestionEtuComponent;
  let fixture: ComponentFixture<GestionEtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEtuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
