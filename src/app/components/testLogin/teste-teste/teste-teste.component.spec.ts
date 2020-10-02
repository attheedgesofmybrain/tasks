import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteTesteComponent } from './teste-teste.component';

describe('TesteTesteComponent', () => {
  let component: TesteTesteComponent;
  let fixture: ComponentFixture<TesteTesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteTesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
