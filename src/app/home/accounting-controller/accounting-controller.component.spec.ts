import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingControllerComponent } from './accounting-controller.component';

describe('AccountingControllerComponent', () => {
  let component: AccountingControllerComponent;
  let fixture: ComponentFixture<AccountingControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
