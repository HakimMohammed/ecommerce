import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCreation } from './customer-creation';

describe('CustomerCreation', () => {
  let component: CustomerCreation;
  let fixture: ComponentFixture<CustomerCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerCreation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCreation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
