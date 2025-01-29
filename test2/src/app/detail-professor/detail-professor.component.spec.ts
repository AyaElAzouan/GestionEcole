import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProfessorComponent } from './detail-professor.component';

describe('DetailProfessorComponent', () => {
  let component: DetailProfessorComponent;
  let fixture: ComponentFixture<DetailProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProfessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
