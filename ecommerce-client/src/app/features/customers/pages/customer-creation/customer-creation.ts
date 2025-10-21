import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-customer-creation',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './customer-creation.html',
  styleUrl: './customer-creation.css'
})
export class CustomerCreation {
  private router = inject(Router);
  private customerService = inject(CustomerService);

  protected readonly creationForm: FormGroup;

  constructor() {
    this.creationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.creationForm.get(controlName);
    if (control?.hasError('required')) return `Field ${controlName} is required.`;
    if (control?.hasError('email')) return 'Invalid email format.';
    return '';
  }

  createCustomer() {
    console.log(this.creationForm.value);
    this.customerService.createCustomer(this.creationForm.value).subscribe(
      (response) => {
        console.log(response);
        document.dispatchEvent(new CustomEvent('basecoat:toast', {
          detail: {
            config: {
              category: 'success',
              title: 'Success',
              description: 'A new customer has been created successfully.',
              cancel: {
                label: 'Dismiss'
              }
            }
          }
        }))
        this.router.navigate(['/customers']);
      },
      (error) => {
        console.error('Error creating customer:', error);
      }
    )

  }

  cancel() {
    this.creationForm.reset();
    this.router.navigate(['/customers']);
  }

}
