import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PullDetailComponent } from './pull-detail.component';

describe('PullDetailComponent', () => {
  let component: PullDetailComponent;
  let fixture: ComponentFixture<PullDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PullDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
