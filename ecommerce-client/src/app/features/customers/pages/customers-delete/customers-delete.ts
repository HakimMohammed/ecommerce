import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CustomerService} from '../../services/customer.service';

@Component({
  selector: 'app-customers-delete',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './customers-delete.html',
  styleUrl: './customers-delete.css'
})
export class CustomersDelete {
  @Input() customerID: string = 'this item';
  @Output() cancel = new EventEmitter<void>();

  customerService = inject(CustomerService);

  onConfirm() {
    this.customerService.deleteCustomer(this.customerID).subscribe({
      next: () => {
        document.dispatchEvent(new CustomEvent('basecoat:toast', {
          detail: {
            config: {
              category: 'success',
              title: 'Success',
              description: 'Customer has been deleted successfully.',
              cancel: {
                label: 'Dismiss'
              }
            }
          }
        }))
      }
    })
    this.cancel.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
