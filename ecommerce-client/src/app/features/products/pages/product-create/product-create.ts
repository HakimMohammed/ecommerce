import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-create',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreate {
  private router = inject(Router);
  private productService = inject(ProductService);

  protected readonly creationForm: FormGroup;

  constructor() {
    this.creationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.creationForm.get(controlName);
    if (control?.hasError('required')) return `Field ${controlName} is required.`;
    if (control?.hasError('min')) return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be a positive number.`;
    return '';
  }

  createProduct() {
    console.log(this.creationForm.value);
    this.productService.createProduct(this.creationForm.value).subscribe(
      (response) => {
        console.log(response);
        document.dispatchEvent(new CustomEvent('basecoat:toast', {
          detail: {
            config: {
              category: 'success',
              title: 'Success',
              description: 'A new product has been created successfully.',
              cancel: {
                label: 'Dismiss'
              }
            }
          }
        }))
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  cancel() {
    this.creationForm.reset();
    this.router.navigate(['/products']);
  }
}
