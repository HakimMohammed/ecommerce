import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel, ProductUpdateModel} from '../../product.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-update',
  standalone: true,
  templateUrl: './product-update.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrl: './product-update.css'
})
export class ProductUpdate implements OnInit {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  readonly PRODUCT_ID = this.activatedRoute.snapshot.paramMap.get('id')!;

  product = signal<ProductModel>({id: '', name: '', price: 0, quantity: 0});

  readonly updateForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(0)])
  });

  getErrorMessage(controlName: string): string {
    const control = this.updateForm.get(controlName);
    if (control?.hasError('required')) return `Field ${controlName} is required.`;
    if (control?.hasError('min')) return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be a positive number.`;
    return '';
  }

  ngOnInit() {
    this.productService.getProductById(this.PRODUCT_ID).subscribe({
      next: (response) => {
        this.product.set(response);

        this.updateForm.patchValue({
          name: response.name,
          price: response.price,
          quantity: response.quantity
        });
      },
      error: (err) => console.error('Error fetching product:', err)
    });
  }

  updateProduct() {
    if (this.updateForm.valid) {
      const data = this.updateForm.value as ProductUpdateModel;
      this.productService.updateProduct(this.PRODUCT_ID, data).subscribe({
        next: () => {
          document.dispatchEvent(new CustomEvent('basecoat:toast', {
            detail: {
              config: {
                category: 'success',
                title: 'Success',
                description: 'Product has been updated successfully.',
                cancel: {
                  label: 'Dismiss'
                }
              }
            }
          }))
          this.router.navigate(['/products']);
        },
        error: err => console.error('Error updating product:', err)
      });
    }
  }

  cancel() {
    this.updateForm.reset();
    this.router.navigate(['/products']);
  }
}
