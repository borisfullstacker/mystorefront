import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerstoreComponent } from './containerstore.component';

describe('ContainerstoreComponent', () => {
  let component: ContainerstoreComponent;
  let fixture: ComponentFixture<ContainerstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
