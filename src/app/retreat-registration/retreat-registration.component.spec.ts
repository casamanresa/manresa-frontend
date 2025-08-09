import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetreatRegistrationComponent } from './retreat-registration.component';

describe('RetreatRegistrationComponent', () => {
  let component: RetreatRegistrationComponent;
  let fixture: ComponentFixture<RetreatRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetreatRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetreatRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
