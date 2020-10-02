import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteLoginComponent } from './teste-login.component';

describe('TesteLoginComponent', () => {
  let component: TesteLoginComponent;
  let fixture: ComponentFixture<TesteLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
