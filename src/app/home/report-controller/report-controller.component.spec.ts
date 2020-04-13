import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportControllerComponent } from './report-controller.component';

describe('ReportControllerComponent', () => {
  let component: ReportControllerComponent;
  let fixture: ComponentFixture<ReportControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
