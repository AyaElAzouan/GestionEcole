import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMatiereComponent } from './detail-matiere.component';

describe('DetailMatiereComponent', () => {
  let component: DetailMatiereComponent;
  let fixture: ComponentFixture<DetailMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailMatiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
