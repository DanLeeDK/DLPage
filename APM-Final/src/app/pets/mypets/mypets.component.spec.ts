import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypetsComponent } from './mypets.component';

describe('MypetsComponent', () => {
  let component: MypetsComponent;
  let fixture: ComponentFixture<MypetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
