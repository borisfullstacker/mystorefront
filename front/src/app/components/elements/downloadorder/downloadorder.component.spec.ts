import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadorderComponent } from './downloadorder.component';

describe('DownloadorderComponent', () => {
  let component: DownloadorderComponent;
  let fixture: ComponentFixture<DownloadorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
