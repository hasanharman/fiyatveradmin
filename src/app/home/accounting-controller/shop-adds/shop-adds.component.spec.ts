import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopAddsComponent } from './shop-adds.component';

describe('ShopAddsComponent', () => {
  let component: ShopAddsComponent;
  let fixture: ComponentFixture<ShopAddsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopAddsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
