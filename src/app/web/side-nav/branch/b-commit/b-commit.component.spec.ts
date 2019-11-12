import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BCommitComponent } from './b-commit.component';

describe('BCommitComponent', () => {
  let component: BCommitComponent;
  let fixture: ComponentFixture<BCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
