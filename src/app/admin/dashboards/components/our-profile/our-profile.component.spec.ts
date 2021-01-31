import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurProfileComponent } from './our-profile.component';

describe('OurProfileComponent', () => {
  let component: OurProfileComponent;
  let fixture: ComponentFixture<OurProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
