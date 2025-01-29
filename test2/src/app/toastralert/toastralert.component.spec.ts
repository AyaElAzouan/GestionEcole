import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastralertComponent } from './toastralert.component';

describe('ToastralertComponent', () => {
  let component: ToastralertComponent;
  let fixture: ComponentFixture<ToastralertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastralertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastralertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
