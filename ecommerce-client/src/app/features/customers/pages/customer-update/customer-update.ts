import {Component, inject, OnInit, signal} from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerModel, CustomerUpdateModel} from '../../customer.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  templateUrl: './customer-update.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './customer-update.css' // ✅ plural
})
export class CustomerUpdate implements OnInit {
  private customerService = inject(CustomerService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  readonly CUSTOMER_ID = this.activatedRoute.snapshot.paramMap.get('id')!;

  customer = signal<CustomerModel>({id: '', name: '', email: ''});

  readonly updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  getErrorMessage(controlName: string): string {
    const control = this.updateForm.get(controlName);
    if (control?.hasError('required')) return `Field ${controlName} is required.`;
    if (control?.hasError('email')) return 'Invalid email format.';
    return '';
  }

  ngOnInit() {
    this.customerService.getCustomerById(this.CUSTOMER_ID).subscribe({
      next: (response) => {
        this.customer.set(response);

        this.updateForm.patchValue({
          name: response.name,
          email: response.email
        });
      },
      error: (err) => console.error('Error fetching customer:', err)
    });
  }

  updateCustomer() {
    if (this.updateForm.valid) {
      const data = this.updateForm.value as CustomerUpdateModel;
      this.customerService.updateCustomer(this.CUSTOMER_ID, data).subscribe({
        next: () => {
          document.dispatchEvent(new CustomEvent('basecoat:toast', {
            detail: {
              config: {
                category: 'success',
                title: 'Success',
                description: 'Customer has been updated successfully.',
                cancel: {
                  label: 'Dismiss'
                }
              }
            }
          }))
          this.router.navigate(['/customers']);
        },
        error: err => console.error(err)
      });
    }
  }

  cancel() {
    this.updateForm.reset();
    this.router.navigate(['/customers']);
  }

}
