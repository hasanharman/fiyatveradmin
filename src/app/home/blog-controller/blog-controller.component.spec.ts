import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogControllerComponent } from './blog-controller.component';

describe('BlogControllerComponent', () => {
  let component: BlogControllerComponent;
  let fixture: ComponentFixture<BlogControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
