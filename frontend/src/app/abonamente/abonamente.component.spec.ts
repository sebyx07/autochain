import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonamenteComponent } from './abonamente.component';

describe('AbonamenteComponent', () => {
  let component: AbonamenteComponent;
  let fixture: ComponentFixture<AbonamenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonamenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
