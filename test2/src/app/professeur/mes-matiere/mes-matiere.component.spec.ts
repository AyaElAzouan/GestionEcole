import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesMatiereComponent } from './mes-matiere.component';

describe('MesMatiereComponent', () => {
  let component: MesMatiereComponent;
  let fixture: ComponentFixture<MesMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesMatiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
