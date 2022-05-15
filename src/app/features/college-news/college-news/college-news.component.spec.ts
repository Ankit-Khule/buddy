import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeNewsComponent } from './college-news.component';

describe('CollegeNewsComponent', () => {
  let component: CollegeNewsComponent;
  let fixture: ComponentFixture<CollegeNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
