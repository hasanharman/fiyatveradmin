import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsupportComponent } from './shopsupport.component';

describe('ShopsupportComponent', () => {
  let component: ShopsupportComponent;
  let fixture: ComponentFixture<ShopsupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopsupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopsupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
