import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeSystemComponent } from './cheque-system.component';

describe('ChequeSystemComponent', () => {
  let component: ChequeSystemComponent;
  let fixture: ComponentFixture<ChequeSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
