import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetProfilComponent } from './pet-profil.component';

describe('PetProfilComponent', () => {
  let component: PetProfilComponent;
  let fixture: ComponentFixture<PetProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
