import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsDetailsComponent } from './friends-details.component';

describe('FriendsDetailsComponent', () => {
  let component: FriendsDetailsComponent;
  let fixture: ComponentFixture<FriendsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
