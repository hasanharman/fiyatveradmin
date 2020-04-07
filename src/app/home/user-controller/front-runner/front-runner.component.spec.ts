import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontRunnerComponent } from './front-runner.component';

describe('FrontRunnerComponent', () => {
  let component: FrontRunnerComponent;
  let fixture: ComponentFixture<FrontRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
