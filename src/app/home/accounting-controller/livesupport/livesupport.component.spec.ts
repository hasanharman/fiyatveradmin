import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivesupportComponent } from './livesupport.component';

describe('LivesupportComponent', () => {
  let component: LivesupportComponent;
  let fixture: ComponentFixture<LivesupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivesupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivesupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
