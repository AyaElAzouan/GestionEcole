import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioProfComponent } from './gestio-prof.component';

describe('GestioProfComponent', () => {
  let component: GestioProfComponent;
  let fixture: ComponentFixture<GestioProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestioProfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestioProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
