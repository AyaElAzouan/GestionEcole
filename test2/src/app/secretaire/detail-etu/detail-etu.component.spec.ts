import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEtuComponent } from './detail-etu.component';

describe('DetailEtuComponent', () => {
  let component: DetailEtuComponent;
  let fixture: ComponentFixture<DetailEtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailEtuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
