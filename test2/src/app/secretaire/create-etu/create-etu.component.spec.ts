import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtuComponent } from './create-etu.component';

describe('CreateEtuComponent', () => {
  let component: CreateEtuComponent;
  let fixture: ComponentFixture<CreateEtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEtuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
