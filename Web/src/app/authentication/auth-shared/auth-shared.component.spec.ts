import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSharedComponent } from './auth-shared.component';

describe('AuthSharedComponent', () => {
  let component: AuthSharedComponent;
  let fixture: ComponentFixture<AuthSharedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthSharedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
