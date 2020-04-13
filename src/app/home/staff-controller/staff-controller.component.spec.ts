import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffControllerComponent } from './staff-controller.component';

describe('StaffControllerComponent', () => {
  let component: StaffControllerComponent;
  let fixture: ComponentFixture<StaffControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
