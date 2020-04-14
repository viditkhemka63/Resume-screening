import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResumeComponent } from './show-resume.component';

describe('ShowResumeComponent', () => {
  let component: ShowResumeComponent;
  let fixture: ComponentFixture<ShowResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
