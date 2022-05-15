import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourBuddyComponent } from './your-buddy.component';

describe('YourBuddyComponent', () => {
  let component: YourBuddyComponent;
  let fixture: ComponentFixture<YourBuddyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourBuddyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
