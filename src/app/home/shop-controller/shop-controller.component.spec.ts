import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopControllerComponent } from './shop-controller.component';

describe('ShopControllerComponent', () => {
  let component: ShopControllerComponent;
  let fixture: ComponentFixture<ShopControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
