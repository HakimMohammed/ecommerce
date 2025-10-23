import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersDelete } from './customers-delete';

describe('CustomersDelete', () => {
  let component: CustomersDelete;
  let fixture: ComponentFixture<CustomersDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
