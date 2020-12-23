import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartisComponent } from './partis.component';

describe('PartisComponent', () => {
  let component: PartisComponent;
  let fixture: ComponentFixture<PartisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
